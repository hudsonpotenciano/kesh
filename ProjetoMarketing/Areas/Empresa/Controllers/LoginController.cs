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
            RetornoRequestModel retorno = new RetornoRequestModel();

            if (usuario != null && !string.IsNullOrWhiteSpace(usuario.Senha))
            {
                Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioEmpresa(usuario);

                if (usuarioAutenticado != null)
                {
                    string token = GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations);
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
            RetornoRequestModel retorno = new RetornoRequestModel();

            if (usuario != null && !string.IsNullOrWhiteSpace(usuario.Senha))
            {
                Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioAdminEmpresa(usuario);

                if (usuarioAutenticado != null)
                {
                    string token = GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations);
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

        [Authorize("Bearer")]
        [HttpPost("DeslogueEmpresa")]
        public void DeslogueEmpresa([FromBody]ParametrosDeslogueUsuario parametros)
        {
            if (parametros != null && !string.IsNullOrWhiteSpace(parametros.Token) &&
                !parametros.IdPerfilEmpresa.Equals(Guid.Empty) && !string.IsNullOrWhiteSpace(parametros.IdNotificacao))
            {
                Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).UsuarioPeloToken(parametros.Token);
                if (usuarioAutenticado == null)
                {
                    return;
                }

                Entidade.Empresa.PerfilEmpresa perfil = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa.Equals(parametros.IdPerfilEmpresa));
                perfil.IdsNotificacao = perfil.IdsNotificacao.Where(id => id != parametros.IdNotificacao).ToList();
                _context.PerfilEmpresa.Update(perfil);
                _context.SaveChangesAsync();
            }
        }
    }
}