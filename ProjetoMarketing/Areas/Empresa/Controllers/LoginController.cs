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
