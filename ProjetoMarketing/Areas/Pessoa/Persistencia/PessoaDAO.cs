using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.DTO;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Models;
using ProjetoMarketing.Negocio;
using ProjetoMarketing.Servicos;
using ProjetoMarketing.Utilidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class PessoaDAO
    {
        private readonly PessoaEmpresaContext _context;

        public PessoaDAO(PessoaEmpresaContext context)
        {
            _context = context;
            if (_context.Database.CurrentTransaction != null)
            {
                _context.Database.CurrentTransaction.Commit();
            }

            _context.Database.BeginTransaction();
        }

        public Task AddIdNotificacao(int? idPessoa, string tokenNotificacao)
        {
            Entidade.Pessoa.Pessoa pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == idPessoa);
            pessoa.IdsNotificacao = pessoa.IdsNotificacao ?? new List<string>();

            if (!pessoa.IdsNotificacao.ToList().Any(n => n == tokenNotificacao))
            {
                pessoa.IdsNotificacao.Add(tokenNotificacao);
                _context.Pessoa.Update(pessoa);
            }

            return _context.SaveChangesAsync();
        }

        public Task AddPessoaUsuario(Models.ParametrosCadastroPessoa model, out Entidade.Pessoa.Pessoa pessoa, out Usuario usuario)
        {
            pessoa = new Entidade.Pessoa.Pessoa()
            {
                Email = model.Email,
                Nome = model.Nome,
            };

            //Necessário para obter o IDPESSOA
            _context.Pessoa.Add(pessoa);
            _context.SaveChanges();

            ImagemPerfil imagemPerfil = new ImagemPerfil()
            {
                Imagem = model.Foto != null ? Convert.FromBase64String(model.Foto) : null,
                IdPessoa = pessoa.IdPessoa,
                //GuidImagem = Guid.NewGuid().ToString()
            };

            usuario = new Usuario()
            {
                IdPessoa = pessoa.IdPessoa,
                Login = model.Email,
                Token = Seguranca.GerarHashMd5(model.Email, model.Senha)
            };

            _context.Usuario.Add(usuario);
            new ImagemService(_context).SaveImagemPerfilPessoa(imagemPerfil);
            return _context.SaveChangesAsync();
        }

        public Task AddPessoaUsuario(Models.ParametrosCadastroPessoaRedeSocial model, out Entidade.Pessoa.Pessoa pessoa, out Usuario usuario)
        {
            pessoa = new Entidade.Pessoa.Pessoa()
            {
                Email = model.Email,
                Nome = model.Nome,
            };

            //Necessário para obter o IDPESSOA
            _context.Pessoa.Add(pessoa);
            _context.SaveChanges();

            ImagemPerfil imagemPerfil = new ImagemPerfil()
            {
                Imagem = model.Foto != null ? Convert.FromBase64String(model.Foto) : null,
                IdPessoa = pessoa.IdPessoa
            };

            usuario = new Usuario()
            {
                IdPessoa = pessoa.IdPessoa,
                Login = model.Email,
                Token = Seguranca.GerarHashMd5(model.Email, model.Id),
                RedeSocial = true
            };

            _context.Usuario.Add(usuario);
            new ImagemService(_context).SaveImagemPerfilPessoa(imagemPerfil);
            return _context.SaveChangesAsync();
        }

        public void Remove(Entidade.Pessoa.Pessoa pessoa)
        {
            _context.Pessoa.Remove(pessoa);
            _context.SaveChanges();
        }

        public Task<Entidade.Pessoa.Pessoa> Select(int idPessoa)
        {
            return _context.Pessoa.FirstOrDefaultAsync(p => p.IdPessoa == idPessoa);
        }

        public Task UpdatePessoaLocalizacao(ParametrosObtenhaPessoaEPerfilEmpresas parametros)
        {
            Entidade.Pessoa.Pessoa pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == parametros.IdPessoa);
            if (pessoa == null)
            {
                return null;
            }

            pessoa.Latitude = parametros.Latitude;
            pessoa.Longitude = parametros.Longitude;

            _context.Pessoa.Update(pessoa);
            return _context.SaveChangesAsync();
        }

        public Task AddOrUpdatePessoaEmpresa(ParametrosAtualizeDadosPessoaEmpresa parametros)
        {
            PessoaEmpresa pessoaEmpresaBd = _context.PessoaEmpresa.FirstOrDefault(p => p.IdPessoa == parametros.IdPessoa && p.IdPerfilEmpresa == parametros.IdPerfilEmpresa);
            if (pessoaEmpresaBd != null)
            {
                pessoaEmpresaBd.Comentario = parametros.Comentario;
                pessoaEmpresaBd.Nota = parametros.Nota;
                pessoaEmpresaBd.DataAvaliacao = DateTime.Now;
                _context.PessoaEmpresa.Update(pessoaEmpresaBd);
                return _context.SaveChangesAsync();
            }
            else
            {
                PessoaEmpresa PessoaEmpresa = new PessoaEmpresa()
                {
                    IdPerfilEmpresa = parametros.IdPerfilEmpresa,
                    IdPessoa = parametros.IdPessoa,
                    Nota = parametros.Nota,
                    DataAvaliacao = DateTime.Now,
                    Comentario = parametros.Comentario
                };

                _context.PessoaEmpresa.Add(PessoaEmpresa);
                return _context.SaveChangesAsync();
            };
        }

        public Task<List<DTO.DTOPessoa>> ObtenhaPessoaEmpresas(ParametrosObtenhaPessoaEPerfilEmpresas parametros)
        {
            try
            {
                //OBTEM EMPRESAS NO RAIO DE 30KM
                return (from perfil in _context.PerfilEmpresa
                        let distancia = Negocio.Localizacao.DistanceTo(parametros.Latitude, parametros.Longitude, perfil.Latitude, perfil.Longitude, parametros.UnidadeDeMedida)
                        let idPerfilEmpresa = perfil.IdPerfilEmpresa
                        join empresa in _context.Empresa on perfil.IdEmpresa equals empresa.IdEmpresa
                        join conta in _context.ContaEmpresa on empresa.IdEmpresa equals conta.IdEmpresa
                        let imagensCatalogo = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == idPerfilEmpresa)
                        let countNota = _context.PessoaEmpresa.Select(a => new { a.IdPerfilEmpresa, a.Nota }).Where(p => p.IdPerfilEmpresa == idPerfilEmpresa && p.Nota != null).Count()
                        let notaGeral = _context.PessoaEmpresa.Select(a => new { a.IdPerfilEmpresa, a.Nota }).Where(p => p.IdPerfilEmpresa == idPerfilEmpresa).Sum(p => p.Nota) / (countNota > 0 ? countNota : 1)
                        from pessoaEmpresa in _context.PessoaEmpresa.Where(a => a.IdPerfilEmpresa == idPerfilEmpresa && a.IdPessoa == parametros.IdPessoa).DefaultIfEmpty()
                        where distancia < 30
                        orderby distancia
                        select new DTO.DTOPessoa()
                        {
                            Empresa = empresa,
                            Catalogo = imagensCatalogo,
                            ContaEmpresa = conta,
                            PerfilEmpresa = perfil,
                            PessoaEmpresa = pessoaEmpresa,
                            NotaGeral = notaGeral,
                            Distancia = distancia,
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<DTOPessoaLoja>> ObtenhaDadosPessoaLojas(ParametrosObtenhaDadosPessoa parametros)
        {
            return (from pessoaLoja in _context.PessoaLoja.Where(a => a.IdPessoa == parametros.IdPessoa)
                    join loja in _context.PerfilEmpresa on pessoaLoja.IdPerfilEmpresa equals loja.IdPerfilEmpresa
                    join conta in _context.ContaEmpresa on loja.IdEmpresa equals conta.IdEmpresa
                    join empresa in _context.Empresa.Select(a => new { a.Nome, a.IdEmpresa }) on conta.IdEmpresa equals empresa.IdEmpresa
                    select new DTOPessoaLoja
                    {
                        Loja = loja,
                        NomeEmpresa = empresa.Nome,
                        Pontos = Conversor.ToMoney(pessoaLoja.Pontos, parametros.Cultura),
                        PontosEmDinheiro = Conversor.ToMoney(Pontos.CalculePontos(pessoaLoja.Pontos, conta.ValorPontos), parametros.Cultura),
                    }).ToListAsync();
        }

        public Task<List<DTO.DTONotasComentariosPessoasEmpresas>> ObtenhaComentarioENotaPessoasEmpresas(ParametrosObtenhaNotasComentarios parametros)
        {
            return (from pe in _context.PessoaEmpresa.Where(p => p.IdPerfilEmpresa == parametros.IdPerfilEmpresa)
                    join p in _context.Pessoa on pe.IdPessoa equals p.IdPessoa
                    select new DTO.DTONotasComentariosPessoasEmpresas()
                    {
                        Comentario = pe.Comentario,
                        Nota = pe.Nota,
                        IdPessoa = p.IdPessoa,
                        IdPerfilEmpresa = pe.IdPerfilEmpresa,
                        NomePessoa = p.Nome,
                        DataAvaliacao = pe.DataAvaliacao
                    }).ToListAsync();
        }

        public Task<List<Entidade.Pessoa.Pessoa>> ObtenhaPessoasCompartilhamento(ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            try
            {
                return (from pessoa in _context.Pessoa
                        let distancia = Negocio.Localizacao.DistanceTo(parametros.Latitude, parametros.Longitude, pessoa.Latitude, pessoa.Longitude, parametros.UnidadeDeMedida)
                        where pessoa.IdPessoa != parametros.IdPessoa
                        where !_context.Cupom.Where(a => a.IdPessoa == pessoa.IdPessoa && a.IdPerfilEmpresa == parametros.IdPerfilEmpresa && Negocio.Cupom.CalculeDataPodeCompartilhar(a.Data)).Any()
                        select new Entidade.Pessoa.Pessoa
                        {
                            IdPessoa = pessoa.IdPessoa,
                            Nome = pessoa.Nome,
                            Email = pessoa.Email
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
