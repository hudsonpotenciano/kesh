using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade.Pessoa;
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
                    Telefone = model.Telefone
                };

                _context.Pessoa.Add(pessoa);
                _context.SaveChanges();

                var perfil = new Entidade.Pessoa.PerfilPessoa()
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
                //SALVE LOG
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

        public Task<List<Entidade.DTOPessoaEmpresa>> ObtenhaPessoaEmpresas(int idPessoa)
        {
            try
            {
                return (from a in _context.Empresa
                        join b in _context.PessoaEmpresa on a.IdEmpresa equals b.IdEmpresa into ab
                        select new Entidade.DTOPessoaEmpresa()
                        {
                            Empresa = a,
                            Comentario = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Comentario,
                            Nota = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Nota,
                            Pontuacao = ab.FirstOrDefault(p => p.IdPessoa == idPessoa).Pontuacao,
                            NotaGeral = ab.Any() ? (ab.Sum(p=>p.Nota) / ab.Count(p=>p.Nota != null)) : null
                        }).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
