using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Models;
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
        }

        public void GereCompartilhamento(ParametrosCompartilhamento parametros, out Compartilhamento compartilhamento)
        {
            compartilhamento = new Compartilhamento()
            {
                IdPerfilEmpresa = parametros.IdPerfilEmpresa,
                IdPessoa = parametros.IdPessoa,
                IdsPessoas = parametros.IdsPessoas,
                Data = DateTime.Today
            };

            _context.Compartilhamento.Add(compartilhamento);
            _context.SaveChanges();
        }

        public Task GereCupom(ParametrosCompartilhamento model, decimal desconto, out Cupom cupom, long idCompartilhamento)
        {

            cupom = new Cupom()
            {
                Desconto = desconto,
                IdPerfilEmpresa = model.IdPerfilEmpresa,
                IdPessoa = model.IdPessoa,
                Data = DateTime.Now,
                IdCompartilhamento = idCompartilhamento
            };

            _context.Cupom.Add(cupom);
            return _context.SaveChangesAsync();
        }

        public Task GereVendaComCupom(ParametrosCupomVenda model, Cupom cupom, out Venda venda)
        {
            venda = new Venda()
            {
                IdCupom = cupom.IdCupom,
                IdPessoa = cupom.IdPessoa,
                IdPerfilEmpresa = cupom.IdPerfilEmpresa,
                Valor = model.ValorDaVenda
            };

            _context.Venda.Add(venda);
            return _context.SaveChangesAsync();
        }

        public Task<List<Cupom>> ObtenhaCuponsEmpresa(long idPerfilEmpresa)
        {
            return _context.Cupom.Where(c => c.IdPerfilEmpresa == idPerfilEmpresa).ToListAsync();
        }

        public Task<List<Cupom>> ObtenhaCuponsPessoaEmpresa(long idPerfilEmpresa, int idPessoa)
        {
            return _context.Cupom.Where(c => c.IdPerfilEmpresa == idPerfilEmpresa && c.IdPessoa == idPessoa).ToListAsync();
        }

        public Task<List<DTO.DTOVendaPessoa>> ObtenhaVendasEmpresaPessoas(long idPerfilEmpresa)
        {
            return (from venda in _context.Venda
                    where venda.IdPerfilEmpresa == idPerfilEmpresa
                    let pessoaNome = _context.Pessoa.Where(p => p.IdPessoa == venda.IdPessoa).Select(a => a.Nome).FirstOrDefault()
                    select new DTO.DTOVendaPessoa()
                    {
                        IdVenda = venda.IdVenda,
                        IdCupom = venda.IdCupom,
                        IdPerfilEmpresa = venda.IdPerfilEmpresa,
                        IdPessoa = venda.IdPessoa,
                        Valor = venda.Valor,
                        Nome = pessoaNome
                    }).ToListAsync();
        }

        public Task<List<Venda>> ObtenhaVendasPessoaEmpresa(long idPerfilEmpresa, int idPessoa)
        {
            return _context.Venda.Where(v => v.IdPerfilEmpresa == idPerfilEmpresa && v.IdPessoa == idPessoa).ToListAsync();
        }

        public Task<List<Cupom>> ObtenhaCuponsPessoa(int idPessoa)
        {
            return _context.Cupom.Where(c => c.IdPessoa == idPessoa).ToListAsync();
        }

        public Task<List<Venda>> ObtenhaVendasPessoa(int idPessoa)
        {
            return _context.Venda.Where(v => v.IdPessoa == idPessoa).ToListAsync();
        }

        public Task<Cupom> SelectCupom(Guid token)
        {
            return _context.Cupom.FirstOrDefaultAsync(a => a.Token.Equals(token));
        }

        public Task<Cupom> ObtenhaCupomPeloToken(ParametrosObtenhaCupom parametros)
        {
            return _context.Cupom.FromSql($@"select * from public.cupom
                                                 where cupom.token = {parametros.CupomToken}
                                                 and not exists (select idvenda from venda where venda.idcupom = cupom.idcupom)").FirstOrDefaultAsync();
        }

        public Task<bool> PessoaPodeCompartilhar(ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            return _context.Compartilhamento.FromSql($@"select idcompartilhamento from compartilhamento where compartilhamento.idpessoa = {parametros.IdPessoa}
                                                          and compartilhamento.idperfilempresa = {parametros.IdPerfilEmpresa}
                                                          and compartilhamento.data >= {DateTime.Today}").AnyAsync();
        }
    }
}
