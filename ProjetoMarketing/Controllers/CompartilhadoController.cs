using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using System.Linq;

namespace ProjetoMarketing.Controllers
{
    [Produces("application/json")]
    [Route("api/Compartilhado")]
    public class CompartilhadoController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;


        public CompartilhadoController(PessoaEmpresaContext pessoaContext)
        {
            _context = pessoaContext;
        }

        [AllowAnonymous]
        [HttpPost("ObtenhaBearerToken")]
        public RetornoRequestModel ObtenhaBearerToken([FromBody] ParametrosRequestModel parametros,
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
