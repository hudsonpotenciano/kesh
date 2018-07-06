using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Areas.Pessoa.Models;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Data;
using System.Threading.Tasks;
using ProjetoMarketing.Contexts;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa/Pessoa")]
    public class PessoaController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;
        private readonly UsuarioContext _contextUsuario;

        public PessoaController(PessoaEmpresaContext context, UsuarioContext contextUsuario)
        {
            _context = context;
            _contextUsuario = contextUsuario;
        }

        [AllowAnonymous]
        [HttpPost("CadastrePessoa")]
        public RetornoRequestModel CadastrePessoa([FromBody] CadastroPessoaModel model,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (_context.Pessoa.Any(p => p.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var retorno = new RetornoRequestModel();

            var pessoa = new Entidade.Pessoa.Pessoa();

            new PessoaDAO(_context).AddPessoaUsuario(model, out pessoa);

            if (pessoa.IdPessoa != 0)
            {
                var usuario = new Entidade.Usuario()
                {
                    IdPessoa = pessoa.IdPessoa,
                    Login = model.Email,
                    Senha = model.Senha
                };

                new UsuarioDAO(_contextUsuario).Add(usuario);
                var user = new User(usuario.Login, usuario.Senha);

                retorno.Result = Projecoes.ProjecaoRetornoCadastroPessoaUsuario(usuario, GenerateAcessToken(user, signingConfigurations, tokenConfigurations));
            }

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaPessoaEmpresas")]
        public RetornoRequestModel ObtenhaPessoaEmpresas([FromBody]ParametrosObtenhaDadosPessoa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var pessoaEmpresas = new PessoaDAO(_context).ObtenhaPessoaEmpresas(parametros.IdPessoa);

            var retorno = new RetornoRequestModel
            {
                //Result = Projecoes.ProjecaoPessoaEmpresas()
            };

            return retorno;
        }

        [AllowAnonymous]
        [HttpGet("ObtenhaFotoPessoa")]
        public ActionResult ObtenhaFotoPessoa(int idPessoa)
        {
            var foto = _context.PerfilPessoa.First(p => p.IdPessoa.Equals(idPessoa))?.Foto;

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }
    }
}