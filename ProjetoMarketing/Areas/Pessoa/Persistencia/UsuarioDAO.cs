using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class UsuarioDAO
    {
        private readonly PessoaEmpresaContext _context;

        public UsuarioDAO(PessoaEmpresaContext context)
        {
            _context = context;
        }

        public Usuario FindUsuarioPessoa(User usuario)
        {
            var token = Seguranca.GerarHashMd5(usuario.Login, usuario.Senha);
            return _context.Usuario.FirstOrDefault(u => u.Token == token && !u.RedeSocial && u.IdPessoa != null);
        }

        public Usuario FindUsuarioPessoa(SocialUser usuario)
        {
            var token = Seguranca.GerarHashMd5(usuario.Email, usuario.Id);
            return _context.Usuario.FirstOrDefault(u => u.Token == token && u.RedeSocial && u.IdPessoa != null);
        }

        public Usuario FindUsuarioEmpresa(User usuario)
        {
            var token = Seguranca.GerarHashMd5(usuario.Login, usuario.Senha);
            return _context.Usuario.FirstOrDefault(u => u.Token == token && u.IdEmpresa != null);
        }

        public Usuario FindUsuarioAdminEmpresa(User usuario)
        {
            var token = Seguranca.GerarHashMd5(usuario.Login, usuario.Senha);
            return _context.Usuario.FirstOrDefault(u => u.TokenEmpresaAdmin == token && u.IdEmpresa != null);
        }

        public bool ValideToken(string token)
        {
            return _context.Usuario.FirstOrDefault(u => u.Token == token) != null;
        }

        public void Remove(Usuario usuario)
        {
            _context.Usuario.Remove(usuario);
            _context.SaveChanges();
        }
    }
}
