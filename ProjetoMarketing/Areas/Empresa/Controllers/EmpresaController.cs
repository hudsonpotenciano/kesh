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

            var usuario = new EmpresaDAO(_context).AddEmpresaUsuario(model, _contextUsuario);

            var user = new User(usuario.Login, usuario.Senha);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoRetornoCadastroUsuarioEmpresa(usuario, GenerateAcessToken(user, signingConfigurations, tokenConfigurations))
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpGet("ObtenhaEmpresas")]
        public RetornoRequestModel ObtenhaEmpresas(ParametrosObtenhaEmpresas parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = new EmpresaDAO(_context).SelectEmpresas()
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpGet("ObtenhaEmpresas")]
        public RetornoRequestModel ObtenhaPerfilEmpresa(ParametrosObtenhaEmpresa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoPerfilEmpresa(_context.PerfilEmpresa.Where(e => e.IdEmpresa == parametros.IdEmpresa).FirstOrDefault())
            };

            return retorno;
        }
    }
}