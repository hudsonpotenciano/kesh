using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Contexts;
using System.Threading.Tasks;

namespace ProjetoMarketing.Servicos
{
    public class UsuarioService
    {
        private readonly PessoaEmpresaContext _context;
        private readonly UsuarioDAO _objetoDeAcesso;

        public UsuarioService(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            _objetoDeAcesso = new UsuarioDAO(contexto);
        }

        public Task AltereSenha(string novaSenha, string token)
        {
            return _objetoDeAcesso.AltereSenha(novaSenha, token);
        }
    }
}