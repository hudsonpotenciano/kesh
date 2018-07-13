using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Models;
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
        }

        public void AddPessoaUsuario(Models.CadastroPessoaModel model, out Entidade.Pessoa.Pessoa pessoa)
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

                var perfil = new PerfilPessoa()
                {
                    Foto = model.Foto != null ? Convert.FromBase64String(model.Foto) : null,
                    IdPessoa = pessoa.IdPessoa
                };

                _context.PerfilPessoa.Add(perfil);
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

        public void Update(Entidade.Pessoa.PerfilPessoa perfil)
        {
            var result = _context.PerfilPessoa.SingleOrDefault(p => p.IdPessoa == perfil.IdPessoa);
            if (result != null)
            {
                result = perfil;
                _context.SaveChanges();
            }
        }

        public Task<List<Entidade.DTOPessoaEmpresa>> ObtenhaPessoaEmpresas(int idPessoa, double latitude, double longitude)
        {
            try
            {
                //OBTEM EMPRESAS NO RAIO DE 50KM
                return (from a in _context.Empresa.FromSql($@"select * from public.empresa
                                                              where (select public.geodistance({latitude},{longitude},latitude,longitude) < 50)")
                        join b in _context.PessoaEmpresa on a.IdEmpresa equals b.IdEmpresa into ab
                        select new Entidade.DTOPessoaEmpresa()
                        {
                            Empresa = a,
                            Comentario = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Comentario,
                            Nota = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Nota,
                            Pontuacao = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Pontuacao,
                            NotaGeral = ab.Any() ? (ab.Sum(p => p.Nota) / ab.Count(p => p.Nota != null)) : null
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
                return (from a in _context.Pessoa.FromSql($@"select * from pessoa
                                                              where (select public.geodistance({parametros.Latitude},{parametros.Longitude},latitude,longitude) < 50)
                                                              and not exists (select idcupom from cupom where idpessoa = public.pessoa.idpessoa
                                                              and idempresa = {parametros.IdEmpresa}
                                                              and (cupom.data < {DateTime.Today.AddDays(-10)} 
                                                              or exists (select idvenda from venda where venda.idcupom = cupom.idcupom)))")
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
