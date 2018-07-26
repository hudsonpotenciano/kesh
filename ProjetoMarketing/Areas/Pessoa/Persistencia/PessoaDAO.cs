using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        }

        public void AddPessoa(Models.CadastroPessoaModel model, out Entidade.Pessoa.Pessoa pessoa)
        {
            try
            {
                _context.Database.BeginTransaction();

                pessoa = new Entidade.Pessoa.Pessoa()
                {
                    Email = model.Email,
                    Nome = model.Nome,
                    Telefone = model.Telefone,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude
                };

                _context.Pessoa.Add(pessoa);
                _context.SaveChanges();

                var imagemPerfil = new ImagemPerfil()
                {
                    Imagem = model.Foto != null ? Convert.FromBase64String(model.Foto) : null,
                    IdPessoa = pessoa.IdPessoa
                };

                _context.ImagemPerfil.Add(imagemPerfil);
                _context.SaveChanges();
                _context.Database.CommitTransaction();
            }
            catch (Exception e)
            {
                _context.Database.RollbackTransaction();

                throw e;
            }
        }

        public void Remove(Entidade.Pessoa.Pessoa pessoa)
        {
            _context.Pessoa.Remove(pessoa);
            _context.SaveChanges();
        }

        public void Update(Entidade.Pessoa.Pessoa pessoa)
        {
            var result = _context.Pessoa.SingleOrDefault(p => p.IdPessoa == pessoa.IdPessoa);
            if (result != null)
            {
                result = pessoa;
                _context.SaveChanges();
            }
        }

        public void AddOrUpdatePessoaEmpresa(ParametrosAtualizeDadosPessoaEmpresa parametros)
        {
            try
            {
                var pessoaEmpresaBd = _context.PessoaEmpresa.FirstOrDefault(p => p.IdPessoa == parametros.IdPessoa && p.IdPerfilEmpresa == parametros.IdPerfilEmpresa);
                if (pessoaEmpresaBd != null)
                {
                    pessoaEmpresaBd.Comentario = parametros.Comentario;
                    pessoaEmpresaBd.Nota = parametros.Nota;
                    _context.PessoaEmpresa.Update(pessoaEmpresaBd);
                    _context.SaveChanges();
                }
                else
                {
                    var PessoaEmpresa = new PessoaEmpresa()
                    {
                        IdPerfilEmpresa = parametros.IdPerfilEmpresa,
                        IdPessoa = parametros.IdPessoa,
                        Nota = parametros.Nota,
                        Comentario = parametros.Comentario
                    };

                    _context.PessoaEmpresa.Add(PessoaEmpresa);
                    _context.SaveChanges();
                };
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<DTO.DTOPessoaEmpresa>> ObtenhaPessoaEmpresas(ParametrosObtenhaPessoaEPerfilEmpresas parametros)
        {
            try
            {
                //OBTEM EMPRESAS NO RAIO DE 50KM
                return (from perfil in _context.PerfilEmpresa.FromSql($@"select * from public.perfilempresa where (select public.geodistance({parametros.Latitude},{parametros.Longitude},latitude,longitude) < 50)")
                        let empresa = _context.Empresa.First(a => a.IdEmpresa == perfil.IdEmpresa)
                        let pessoasEmpresa = _context.PessoaEmpresa.Where(a => a.IdPerfilEmpresa == perfil.IdPerfilEmpresa)
                        let conta = _context.ContaEmpresa.First(a => a.IdEmpresa == empresa.IdEmpresa)
                        let imagensCatalogo = _context.ImagemCatalogo.Where(a=>a.IdPerfilEmpresa == perfil.IdEmpresa)
                        select new DTO.DTOPessoaEmpresa()
                        {
                            Empresa = empresa,
                            Catalogo = imagensCatalogo,
                            ContaEmpresa = conta,
                            PerfilEmpresa = perfil,
                            PessoaEmpresa = pessoasEmpresa.First(p => p.IdPessoa == parametros.IdPessoa),
                            NotaGeral = pessoasEmpresa.Any() ? (pessoasEmpresa.Sum(p => p.Nota) / pessoasEmpresa.Count(p => p.Nota != null)) : null
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<DTO.DTONotasComentariosPessoasEmpresas>> ObtenhaComentarioENotaPessoasEmpresas(ParametrosObtenhaNotasComentarios parametros)
        {
            try
            {
                return (from pe in _context.PessoaEmpresa.Where(p=>p.IdPerfilEmpresa == parametros.IdPerfilEmpresa)
                        join p in _context.Pessoa on pe.IdPessoa equals p.IdPessoa
                        select new DTO.DTONotasComentariosPessoasEmpresas()
                        {
                            Comentario = pe.Comentario,
                            Nota = pe.Nota,
                            IdPessoa = p.IdPessoa,
                            Nome = p.Nome
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<Entidade.Pessoa.Pessoa>> ObtenhaPessoasCompartilhamento(ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            try
            {
                var nfi = new NumberFormatInfo
                {
                    NumberDecimalSeparator = "."
                };

                RawSqlString sql = $@"select * from pessoa where (select public.geodistance(cast('{parametros.Latitude.ToString(nfi)}' as double precision), cast('{parametros.Longitude.ToString(nfi)}' as double precision),latitude,longitude) < 50)
                                                              and not exists (select idcupom from cupom where idpessoa = public.pessoa.idpessoa
                                                              and idempresa = {parametros.IdEmpresa}
                                                              and cupom.data >= '{DateTime.Today.AddDays(-10).ToString("yyyy-MM-dd")}')";

                return (from a in _context.Pessoa.FromSql(sql)
                        select new Entidade.Pessoa.Pessoa()
                        {
                            Nome = a.Nome,
                            Email = a.Email,
                            IdPessoa = a.IdPessoa,
                            Telefone = a.Telefone,
                            Latitude = a.Latitude,
                            Longitude = a.Longitude,
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
