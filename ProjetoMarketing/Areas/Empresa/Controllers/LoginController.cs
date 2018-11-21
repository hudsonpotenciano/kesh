using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Persistencia;
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
                    if (!string.IsNullOrEmpty(usuario.TokenNotificacao) && usuarioAutenticado.IdEmpresa != null)
                    {
                        new EmpresaDAO(_context).AddIdNotificacao(usuarioAutenticado.IdEmpresa, usuario.TokenNotificacao);
                    }
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
        [HttpPost("RealizeLoginAdmin")]
        public RetornoRequestModel RealizeLoginAdmin([FromBody] User usuario,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            var retorno = new RetornoRequestModel();

            if (usuario != null && !String.IsNullOrWhiteSpace(usuario.Senha))
            {
                var usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioAdminEmpresa(usuario);

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
    }
}