using System;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Contexts;
using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa/Login")]
    public class LoginController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;

        public LoginController(PessoaEmpresaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public string Get()
        {
            return "value1";
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
                var usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioPessoa(usuario);

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
        [HttpPost("RealizeLoginRedeSocial")]
        public RetornoRequestModel RealizeLoginRedeSocial([FromBody] SocialUser usuario,
                                              [FromServices]SigningConfigurations signingConfigurations,
                                              [FromServices]TokenConfigurations tokenConfigurations)
        {
            var retorno = new RetornoRequestModel();

            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Email))
            {
                var usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioPessoa(usuario);

                if (usuarioAutenticado != null)
                {
                    var token = GenerateAcessToken(usuario.Email, signingConfigurations, tokenConfigurations);

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