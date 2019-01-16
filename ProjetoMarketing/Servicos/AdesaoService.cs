using ProjetoMarketing.Contexts;
using ProjetoMarketing.Persistencia;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Servicos
{
    public class AdesaoService
    {
        private readonly PessoaEmpresaContext _context;
        private readonly AdesaoDAO _objetoDeAcesso;

        public AdesaoService(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            _objetoDeAcesso = new AdesaoDAO(contexto);
        }
    }
}
