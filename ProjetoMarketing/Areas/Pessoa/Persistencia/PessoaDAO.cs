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
    }
}
