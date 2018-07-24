using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa/Login")]
    public class LoginController : ControladorBase
    {
        private readonly UsuarioContext _context;
        private readonly UsuarioContext _contextUsuario;

        public LoginController(UsuarioContext context, UsuarioContext contextUsuario)
        {
            _context = context;
            _contextUsuario = contextUsuario;
        }

        [AllowAnonymous]
        [HttpPost("RealizeLogin")]
        public RetornoRequestModel RealizeLogin([FromBody] User usuario,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            var retorno = new RetornoRequestModel();

            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Senha))
            {
                var usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioEmpresa(usuario);

                if (usuarioAutenticado != null)
                {
                    var token = GenerateAcessToken(usuario, signingConfigurations, tokenConfigurations);

                    retorno.Authenticated = true;
                    retorno.Result = Projecoes.ProjecaoRetornoLogin(usuarioAutenticado, token);
                }
                else
                {
                    return RetornoRequestModel.CrieFalhaLogin();
                }
            }
            else
            {
                return RetornoRequestModel.CrieFalhaLogin();
            }

            return retorno;
        }

        //[AllowAnonymous]
        //[HttpPost("ObtenhaBearerToken")]
        //public RetornoRequestModel RealizeLogin([FromBody] ParametrosRequestModel parametros,
        //                                      [FromServices]SigningConfigurations signingConfigurations,
        //                                      [FromServices]TokenConfigurations tokenConfigurations)
        //{
        //    if (!EstaAutenticado(_contextUsuario, parametros.Token))
        //        return RetornoRequestModel.CrieFalhaLogin();

        //    return new RetornoRequestModel().Result = new { token = GenerateAcessToken(usuario, signingConfigurations, tokenConfigurations) }
        //}
    }
}
