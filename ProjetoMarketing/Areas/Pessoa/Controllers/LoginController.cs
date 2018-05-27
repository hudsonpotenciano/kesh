using System;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Data;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Principal;
using ProjetoMarketing.Models;
using ProjetoMarketing.Controllers;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa/Login")]
    public class LoginController : ControladorBase
    {
        private readonly UsuarioContext _context;

        public LoginController(UsuarioContext context)
        {
            _context = context;
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
                var usuarioAutenticado = new UsuarioDAO(_context).Find(usuario);

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
    }
}