using ProjetoMarketing.Areas.Pessoa.Models;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Contexts;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Servicos
{
    public class PessoaService
    {
        private readonly PessoaEmpresaContext _context;
        private readonly PessoaDAO _objetoDeAcesso;

        public PessoaService(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            _objetoDeAcesso = new PessoaDAO(contexto);
        }
    }
}
