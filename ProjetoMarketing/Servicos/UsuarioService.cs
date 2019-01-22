using ProjetoMarketing.Areas.Pessoa.Models;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;

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

        public string AltereSenha(ParametrosAlteracaoDeSenha parametros, string token)
        {
            return _objetoDeAcesso.AltereSenha(parametros.NovaSenha, token);
        }
    }
}