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

        public void AddPessoa(Models.ParametrosCadastroPessoa model, out Entidade.Pessoa.Pessoa pessoa)
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

        //public Task UpdateImagemPerfil(Models.ParametrosAtualizeFoto parametros)
        //{
        //    var imagemPerfil = new ImagemPerfil()
        //    {
        //        Imagem = parametros.Foto != null ? Convert.FromBase64String(parametros.Foto) : null,
        //        IdPessoa = parametros.IdPessoa
        //    };
            
        //    _context.ImagemPerfil.Update(imagemPerfil);
        //    return _context.SaveChangesAsync();
        //}

        public void Remove(Entidade.Pessoa.Pessoa pessoa)
        {
            _context.Pessoa.Remove(pessoa);
            _context.SaveChanges();
        }

        //public void Update(Entidade.Pessoa.Pessoa pessoa)
        //{
        //    var result = _context.Pessoa.SingleOrDefault(p => p.IdPessoa == pessoa.IdPessoa);
        //    if (result != null)
        //    {
        //        result = pessoa;
        //        _context.SaveChanges();
        //    }
        //}

        public Task<Entidade.Pessoa.Pessoa> Select(int idPessoa)
        {
            try
            {
                return _context.Pessoa.FirstOrDefaultAsync(p => p.IdPessoa == idPessoa);
            }
            catch (Exception e)
            {
                throw e;
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
                    pessoaEmpresaBd.DataAvaliacao = DateTime.Now;
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
                        DataAvaliacao = DateTime.Now,
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
                var nfi = new NumberFormatInfo
                {
                    NumberDecimalSeparator = "."
                };

                //OBTEM EMPRESAS NO RAIO DE 50KM
                RawSqlString sqlPerfis = $@"select * from public.perfilempresa where 
                                                                        (select public.geodistance(cast('{parametros.Latitude.ToString(nfi)}' as double precision),
                                                                        cast('{parametros.Longitude.ToString(nfi)}' as double precision),latitude,longitude) < 50)";

                return (from perfil in _context.PerfilEmpresa.FromSql(sqlPerfis)
                        let idPerfilEmpresa = perfil.IdPerfilEmpresa
                        let pessoasEmpresa = _context.PessoaEmpresa.Where(p => p.IdPerfilEmpresa == idPerfilEmpresa)
                        let imagensCatalogo = _context.ImagemCatalogo.Where(d => d.IdPerfilEmpresa == idPerfilEmpresa)
                        let empresa = _context.Empresa.FirstOrDefault(a => a.IdEmpresa == perfil.IdEmpresa)
                        let conta = _context.ContaEmpresa.FirstOrDefault(c => c.IdEmpresa == empresa.IdEmpresa)
                        let pessoaEmpresa = _context.PessoaEmpresa.FirstOrDefault(p => p.IdPessoa == parametros.IdPessoa)
                        let notaGeral = _context.PessoaEmpresa.Sum(p => p.Nota) / _context.PessoaEmpresa.Count(p => p.Nota != null)
                        select new DTO.DTOPessoaEmpresa()
                        {
                            Empresa = empresa,
                            Catalogo = imagensCatalogo,
                            ContaEmpresa = conta,
                            PerfilEmpresa = perfil,
                            PessoaEmpresa = pessoaEmpresa,
                            NotaGeral = notaGeral
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
                return (from pe in _context.PessoaEmpresa.Where(p => p.IdPerfilEmpresa == parametros.IdPerfilEmpresa)
                        join p in _context.Pessoa on pe.IdPessoa equals p.IdPessoa
                        select new DTO.DTONotasComentariosPessoasEmpresas()
                        {
                            Comentario = pe.Comentario,
                            Nota = pe.Nota,
                            IdPessoa = p.IdPessoa,
                            Nome = p.Nome,
                            DataAvaliacao = pe.DataAvaliacao
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
                                                              and idperfilempresa = {parametros.IdPerfilEmpresa}
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
