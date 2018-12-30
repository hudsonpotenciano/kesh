using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.DTO;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Models;
using ProjetoMarketing.Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Persistencia
{
    public class TransacaoDAO
    {
        private readonly PessoaEmpresaContext _context;

        public TransacaoDAO(PessoaEmpresaContext context)
        {
            _context = context;
            if (_context.Database.CurrentTransaction != null)
            {
                _context.Database.CurrentTransaction.Commit();
            }

            _context.Database.BeginTransaction();
        }

        public Task GereCompartilhamento(ParametrosCompartilhamento parametros, out Compartilhamento compartilhamento)
        {
            compartilhamento = new Compartilhamento()
            {
                IdPerfilEmpresa = parametros.IdPerfilEmpresa,
                IdPessoa = parametros.IdPessoa,
                Codigo = parametros.Codigo,
                Data = DateTime.Today
            };

            _context.Compartilhamento.Add(compartilhamento);
            return _context.SaveChangesAsync();
        }

        public Task GereCupom(ParametrosCodigoCompartilhamento parametros, out Entidade.Cupom cupom, Compartilhamento compartilhamento)
        {
            var Data = DateTime.Now;
            List<Entidade.Cupom> cupons = new List<Entidade.Cupom>();

            cupom = new Entidade.Cupom()
            {
                IdPerfilEmpresa = compartilhamento.IdPerfilEmpresa,
                IdPessoa = parametros.IdPessoaReceptor,
                Data = Data,
                DataValidade = Data.AddDays(1),
                IdCompartilhamento = compartilhamento.IdCompartilhamento
            };

            cupons.Add(cupom);

            //pessoas do compartilhamento
            cupons.Add(new Entidade.Cupom()
            {
                IdPerfilEmpresa = compartilhamento.IdPerfilEmpresa,
                IdPessoa = compartilhamento.IdPessoa,
                Data = Data,
                DataValidade = Data.AddDays(1),
                IdCompartilhamento = compartilhamento.IdCompartilhamento
            });

            _context.Cupom.AddRange(cupons);
            return _context.SaveChangesAsync();
        }

        public Task UpdateCompartilhamento (Compartilhamento compartilhamento)
        {
            _context.Compartilhamento.Update(compartilhamento);
            return _context.SaveChangesAsync();
        }

        public Task GereVendaComCupom(ParametrosCupomVenda model, Entidade.Cupom cupom, out Venda venda)
        {
            venda = new Venda()
            {
                IdCupom = cupom.IdCupom,
                IdPessoa = cupom.IdPessoa,
                IdPerfilEmpresa = cupom.IdPerfilEmpresa,
                Valor = model.ValorDaVenda,
                Data = DateTime.Now
            };

            _context.Venda.Add(venda);

            PessoaLoja pessoaloja = _context.PessoaLoja.FirstOrDefault(a => a.IdPessoa == cupom.IdPessoa && a.IdPerfilEmpresa == cupom.IdPerfilEmpresa);
            var perfil = _context.PerfilEmpresa.Select(a => new { a.IdPerfilEmpresa, a.IdEmpresa }).First(a => a.IdPerfilEmpresa == cupom.IdPerfilEmpresa);
            var conta = _context.ContaEmpresa.Select(a => new { a.ValorPontos, a.IdEmpresa }).First(a => a.IdEmpresa == perfil.IdEmpresa);

            if (pessoaloja == null)
            {
                _context.PessoaLoja.Add(new PessoaLoja()
                {
                    IdPerfilEmpresa = venda.IdPerfilEmpresa,
                    IdPessoa = venda.IdPessoa,
                    Pontos = venda.Valor
                });
            }
            else
            {
                if (model.UsarPontos)
                {
                    decimal valorDosPontosEmDinheiro = Pontos.CalculePontos(pessoaloja.Pontos, conta.ValorPontos);

                    if (valorDosPontosEmDinheiro > 0)
                    {
                        if (venda.Valor > valorDosPontosEmDinheiro)
                        {
                            decimal valorQueSobra = venda.Valor - valorDosPontosEmDinheiro;
                            //usar os pontos como pagamento
                            pessoaloja.Pontos = pessoaloja.Pontos - Pontos.CalculeEquivalente(valorDosPontosEmDinheiro, conta.ValorPontos);
                            //adiciona os pontos com o dinheiro que passou
                            pessoaloja.Pontos = pessoaloja.Pontos + valorQueSobra;
                        }
                        else
                        {
                            //usa os pontos como pagamento
                            pessoaloja.Pontos = pessoaloja.Pontos - Pontos.CalculeEquivalente(venda.Valor, conta.ValorPontos);
                        }
                    }
                    else
                    {
                        //senao somente adiciona os pontos da venda
                        pessoaloja.Pontos += venda.Valor;
                    }
                }
                else
                {
                    //adiciona os pontos da venda
                    pessoaloja.Pontos += venda.Valor;
                }

                _context.PessoaLoja.Update(pessoaloja);
            }

            return _context.SaveChangesAsync();
        }

        public Task<List<DTO.DTOCupomVenda>> ObtenhaCuponsEVendasPessoa(int idPessoa)
        {
            return (from cupom in _context.Cupom.Where(c => c.IdPessoa == idPessoa)
                    join venda in _context.Venda on cupom.IdCupom equals venda.IdCupom into vendas
                    join perfilEmpresa in _context.PerfilEmpresa.Select(a => new { a.IdPerfilEmpresa, a.Descricao, a.IdEmpresa }) on cupom.IdPerfilEmpresa equals perfilEmpresa.IdPerfilEmpresa
                    join empresa in _context.Empresa.Select(a => new { a.IdEmpresa, a.Nome }) on perfilEmpresa.IdEmpresa equals empresa.IdEmpresa
                    from inVenda in vendas.DefaultIfEmpty()
                    orderby cupom.DataValidade descending
                    select new DTO.DTOCupomVenda()
                    {
                        Cupom = cupom,
                        Venda = inVenda,
                        NomeEmpresa = empresa.Nome,
                        DescricaoPerfilEmpresa = perfilEmpresa.Descricao,
                        IdEmpresa = perfilEmpresa.IdEmpresa,
                        Pontos = inVenda != null ? inVenda.Valor : 0
                    }).ToListAsync();
        }

        public Task<List<DTO.DTOVendasAdminLoja>> ObtenhaCuponsEVendasEmpresaAdmin(int idEmpresa)
        {
            return (from venda in _context.Venda
                    join perfil in _context.PerfilEmpresa on venda.IdPerfilEmpresa equals perfil.IdPerfilEmpresa
                    where perfil.IdEmpresa == idEmpresa
                    select new DTO.DTOVendasAdminLoja()
                    {
                        Venda = venda,
                        NomeLoja = perfil.Descricao
                    }).ToListAsync();
        }


        public Task<List<DTO.DTOCupomVenda>> ObtenhaCuponsEVendasEmpresa(long idPerfilEmpresa)
        {
            return (from cupom in _context.Cupom.Where(c => c.IdPerfilEmpresa == idPerfilEmpresa)
                    join venda in _context.Venda on cupom.IdCupom equals venda.IdCupom
                    join pessoa in _context.Pessoa.Select(a => new { a.IdPessoa, a.Nome }) on cupom.IdPessoa equals pessoa.IdPessoa
                    join perfilEmpresa in _context.PerfilEmpresa.Select(a => new { a.IdPerfilEmpresa, a.Descricao, a.IdEmpresa }) on cupom.IdPerfilEmpresa equals perfilEmpresa.IdPerfilEmpresa
                    join empresa in _context.Empresa.Select(a => new { a.IdEmpresa, a.Nome }) on perfilEmpresa.IdEmpresa equals empresa.IdEmpresa
                    where venda != null
                    select new DTO.DTOCupomVenda()
                    {
                        Cupom = cupom,
                        Venda = venda,
                        NomePessoa = pessoa.Nome,
                        IdEmpresa = empresa.IdEmpresa,
                        NomeEmpresa = empresa.Nome,
                        DescricaoPerfilEmpresa = perfilEmpresa.Descricao,
                        Pontos = venda != null ? venda.Valor : 0
                    }).ToListAsync();
        }

        public Task<Entidade.Cupom> SelectCupom(Guid token)
        {
            return _context.Cupom.FirstOrDefaultAsync(a => a.Token.Equals(token));
        }

        public Task<DTOCupomParaVenda> ObtenhaCupomPeloToken(ParametrosObtenhaCupom parametros)
        {
            return (from cupom in _context.Cupom
                    join perfilEmpresa in _context.PerfilEmpresa.Select(a => new { a.IdPerfilEmpresa, a.IdEmpresa }) on parametros.IdPerfilEmpresa equals perfilEmpresa.IdPerfilEmpresa
                    join conta in _context.ContaEmpresa.Select(a => new { a.IdEmpresa, a.ValorPontos }) on perfilEmpresa.IdEmpresa equals conta.IdEmpresa
                    let pessoaEmpresa = _context.PessoaLoja.Select(a => new { a.IdPessoa, a.IdPerfilEmpresa, a.Pontos }).FirstOrDefault(a => a.IdPessoa == cupom.IdPessoa)
                    where cupom.Token == parametros.CupomToken && cupom.IdPerfilEmpresa == parametros.IdPerfilEmpresa
                    select new DTOCupomParaVenda()
                    {
                        Cupom = cupom,
                        TotalDinheiroPessoa = pessoaEmpresa != null ? Pontos.CalculePontos(pessoaEmpresa.Pontos, conta.ValorPontos) : 0
                    }).FirstOrDefaultAsync();
        }

        public Task<bool> PessoaPodeCompartilhar(ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            return _context.Cupom.AnyAsync(a => a.IdPessoa == parametros.IdPessoa
                                                     && a.IdPerfilEmpresa == parametros.IdPerfilEmpresa && a.DataValidade >= DateTime.Now
                                                     && !_context.Venda.Any(b=>b.IdCupom == a.IdCupom));
        }
    }
}
