using ProjetoMarketing.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Persistencia
{
    public class AdesaoDAO
    {
        private readonly PessoaEmpresaContext _context;
        public AdesaoDAO(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            if (_context.Database.CurrentTransaction != null)
            {
                _context.Database.CurrentTransaction.Commit();
            }

            _context.Database.BeginTransaction();
        }
    }
}
