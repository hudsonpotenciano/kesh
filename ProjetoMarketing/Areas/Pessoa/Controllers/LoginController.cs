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

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Login")]
    public class LoginController : ControladorBase
    {
        private readonly UsuarioContext _context;

        public LoginController(UsuarioContext context)
        {
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public RetornoRequestModel PostLogin(User usuario,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            var retorno = new RetornoRequestModel();

            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Senha))
            {
                var usuarioAutenticado = new UsuarioDAO(_context).Find(usuario);

                if (usuarioAutenticado != null)
                {
                    retorno.Result = Projecoes.ProjecaoRetornoLogin(usuarioAutenticado);

                    ClaimsIdentity identity = new ClaimsIdentity(
                        new GenericIdentity(usuario.Login, "Login"),
                        new[] { new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, usuario.Login)
                   });

                    DateTime dataCriacao = DateTime.Now;
                    DateTime dataExpiracao = dataCriacao + TimeSpan.FromSeconds(tokenConfigurations.Seconds);

                    var handler = new JwtSecurityTokenHandler();
                    var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                    {
                        Issuer = tokenConfigurations.Issuer,
                        Audience = tokenConfigurations.Audience,
                        SigningCredentials = signingConfigurations.SigningCredentials,
                        Subject = identity,
                        NotBefore = dataCriacao,
                        Expires = dataExpiracao
                    });

                    var token = handler.WriteToken(securityToken);

                    retorno.AccessToken = token;
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