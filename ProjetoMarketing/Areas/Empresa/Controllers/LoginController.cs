using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using System;
using System.Linq;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa/Login")]
    public class LoginController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;

        public LoginController(PessoaEmpresaContext context)
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
                var usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioEmpresa(usuario);

                if (usuarioAutenticado != null)
                {
                    var token = GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations);

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

        [AllowAnonymous]
        [HttpPost("ObtenhaBearerToken")]
        public RetornoRequestModel RealizeLogin([FromBody] ParametrosRequestModel parametros,
                                              [FromServices]SigningConfigurations signingConfigurations,
                                              [FromServices]TokenConfigurations tokenConfigurations)
        {
            var usuario = _context.Usuario.FirstOrDefault(u => u.Token == parametros.Token);

            if (usuario != null)
            {
                var retorno = new RetornoRequestModel()
                {
                    Result = new { AcessToken = GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations) }
                };

                return retorno;
            }
            else
                return RetornoRequestModel.CrieFalhaLogin();
        }
    }
}