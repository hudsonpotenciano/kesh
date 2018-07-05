using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Context;
using ProjetoMarketing.Autentication.Context;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Data;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa/Empresa")]
    public class EmpresaController : ControladorBase
    {
        private readonly EmpresaContext _context;
        private readonly UsuarioContext _contextUsuario;

        public EmpresaController(EmpresaContext context, UsuarioContext usuarioContext)
        {
            _context = context;
            _contextUsuario = usuarioContext;
        }

        [AllowAnonymous]
        [HttpPost("CadastreEmpresa")]
        public RetornoRequestModel CadastreEmpresa([FromBody]CadastroEmpresaModel model,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (_context.Empresa.Any(e => e.Cnpj == model.Cnpj || e.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var retorno = new RetornoRequestModel();

            var empresa = new Entidade.Empresa.Empresa();
            new EmpresaDAO(_context).AddEmpresaUsuario(model, out empresa);

            var usuario = new Entidade.Usuario()
            {
                IdEmpresa = empresa.IdEmpresa,
                Login = model.Email,
                Senha = model.Senha
            };

            if (empresa.IdEmpresa != 0)
            {
                new UsuarioDAO(_contextUsuario).Add(usuario);
                var user = new User(usuario.Login, usuario.Senha);

                retorno.Result = Projecoes.ProjecaoRetornoCadastroUsuarioEmpresa(usuario, GenerateAcessToken(user, signingConfigurations, tokenConfigurations));
            }

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaEmpresas")]
        public async Task<RetornoRequestModel> ObtenhaEmpresas([FromBody]ParametrosObtenhaEmpresas parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoEmpresas(await new EmpresaDAO(_context).SelectEmpresas())
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaPerfilEmpresa")]
        public async Task<RetornoRequestModel> ObtenhaPerfilEmpresa([FromBody]ParametrosObtenhaEmpresa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoPerfilEmpresa(await new EmpresaDAO(_context).SelectPerfilEmpresa(parametros.IdEmpresa))
            };

            return retorno;
        }

        [AllowAnonymous]
        [HttpGet("ObtenhaLogoEmpresa")]
        public ActionResult ObtenhaLogoEmpresa(int idEmpresa)
        {
            var foto = _context.ImagensEmpresa.FirstOrDefault(x => x.IdEmpresa == idEmpresa && x.Tipo == 1)?.Imagem;

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }
    }
}