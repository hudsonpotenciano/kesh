using ProjetoMarketing.Areas.Pessoa.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class PessoaDAO
    {
        private readonly PessoaContext _context;

        public PessoaDAO(PessoaContext context)
        {
            _context = context;
        }

        public void Add(Entidade.Pessoa.Pessoa usuario)
        {
            _context.Pessoa.Add(usuario);
            _context.SaveChanges();
        }

        public void AddPerfil(Entidade.Pessoa.PerfilPessoa perfil)
        {
            _context.PerfilPessoa.Add(perfil);
            _context.SaveChanges();
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
    }
}
