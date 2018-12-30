using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using System.Linq;

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

        [AllowAnonymous]
        [HttpPost("RealizeLogin")]
        public RetornoRequestModel RealizeLogin([FromBody] User usuario,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            try
            {


                RetornoRequestModel retorno = new RetornoRequestModel();

                if (usuario != null && !string.IsNullOrWhiteSpace(usuario.Login) && !string.IsNullOrWhiteSpace(usuario.Senha))
                {
                    Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioPessoa(usuario);

                    if (usuarioAutenticado != null)
                    {
                        string token = GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations);
                        retorno.Authenticated = true;
                        retorno.Result = Projecoes.ProjecaoRetornoLogin(usuarioAutenticado, token);
                        if (!string.IsNullOrEmpty(usuario.TokenNotificacao) && usuarioAutenticado.IdPessoa != null && usuarioAutenticado.IdPessoa > 0)
                        {
                            new PessoaDAO(_context).AddIdNotificacao(usuarioAutenticado.IdPessoa, usuario.TokenNotificacao);
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
            catch (System.Exception e)
            {
                return RetornoRequestModel.CrieFalhaLogin();
                throw e;
            }
        }

        [AllowAnonymous]
        [HttpPost("RealizeLoginRedeSocial")]
        public RetornoRequestModel RealizeLoginRedeSocial([FromBody] SocialUser usuario,
                                              [FromServices]SigningConfigurations signingConfigurations,
                                              [FromServices]TokenConfigurations tokenConfigurations)
        {
            RetornoRequestModel retorno = new RetornoRequestModel();

            if (usuario != null && !string.IsNullOrWhiteSpace(usuario.Email))
            {
                Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).FindUsuarioPessoa(usuario);

                if (usuarioAutenticado != null)
                {
                    string token = GenerateAcessToken(usuario.Email, signingConfigurations, tokenConfigurations);

                    retorno.Authenticated = true;
                    retorno.Result = Projecoes.ProjecaoRetornoLogin(usuarioAutenticado, token);
                    if (!string.IsNullOrEmpty(usuario.TokenNotificacao))
                    {
                        new PessoaDAO(_context).AddIdNotificacao(usuarioAutenticado.IdPessoa, usuario.TokenNotificacao);
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

        [Authorize("Bearer")]
        [HttpPost("DesloguePessoa")]
        public void DesloguePessoa([FromBody]ParametrosDeslogueUsuario parametros)
        {
            if (parametros != null && !string.IsNullOrWhiteSpace(parametros.Token) &&
                !string.IsNullOrWhiteSpace(parametros.IdNotificacao) && parametros.IdPessoa > 0)
            {
                Entidade.Usuario usuarioAutenticado = new UsuarioDAO(_context).UsuarioPeloToken(parametros.Token);
                if (usuarioAutenticado == null)
                {
                    return;
                }

                Entidade.Pessoa.Pessoa pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == usuarioAutenticado.IdPessoa);
                pessoa.IdsNotificacao = pessoa.IdsNotificacao.Where(id => id != parametros.IdNotificacao).ToList();
                _context.Pessoa.Update(pessoa);
                _context.SaveChangesAsync();
            }
        }
    }
}