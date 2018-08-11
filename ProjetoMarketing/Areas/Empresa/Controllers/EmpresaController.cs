using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Models;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Data;
using System.Threading.Tasks;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Areas.Empresa.Persistencia;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa/Empresa")]
    public class EmpresaController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;

        public EmpresaController(PessoaEmpresaContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("CadastreEmpresa")]
        public async Task<RetornoRequestModel> CadastreEmpresa([FromBody]CadastroEmpresaModel model,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (_context.Empresa.Any(e => e.Cnpj == model.Cnpj || e.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var empresa = new Entidade.Empresa.Empresa();
            var usuario = new Entidade.Usuario();

            await new EmpresaDAO(_context).AddEmpresaUsuario(model, out empresa, out usuario);

            if (usuario.IdUsuario != 0)
            {
                var retorno = new RetornoRequestModel
                {
                    Result = Projecoes.ProjecaoRetornoCadastroUsuarioEmpresa(usuario, GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations))
                };

                return retorno;
            }

            return RetornoRequestModel.CrieFalha();
        }

        [Authorize("Bearer")]
        [HttpPost("AtualizeContaEmpresa")]
        public async Task<RetornoRequestModel> AtualizeContaEmpresa([FromBody]AtualizeContaModel parametros)
        {
            await new EmpresaDAO(_context).UpdateConta(parametros);

            return RetornoRequestModel.CrieSucesso();
        }

        [Authorize("Bearer")]
        [HttpPost("AtualizePerfilEmpresa")]
        public async Task<RetornoRequestModel> AtualizePerfilEmpresa([FromBody]CadastroPerfilModel parametros)
        {
            await new EmpresaDAO(_context).UpdatePerfil(parametros);

            return RetornoRequestModel.CrieSucesso();
        }


        [Authorize("Bearer")]
        [HttpPost("ObtenhaPerfisDaEmpresaParaSelecao")]
        public async Task<RetornoRequestModel> ObtenhaPerfisDaEmpresaParaSelecao([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            var perfisEmpresa = await new EmpresaDAO(_context).SelectPerfisEmpresa(parametros.IdEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.ProjecaoPerfisEmpresaParcial(perfisEmpresa)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaDadosEmpresaLoja")]
        public async Task<RetornoRequestModel> ObtenhaDadosEmpresaLoja([FromBody]ParametrosObtenhaEmpresaLoja parametros)
        {
            var dadosEmpresa = await new EmpresaDAO(_context).SelectEmpresaLoja(parametros.IdEmpresa, parametros.IdPerfilEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.DadosEmpresaLoja(dadosEmpresa)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaDadosEmpresaAdmin")]
        public async Task<RetornoRequestModel> ObtenhaDadosEmpresaAdmin([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            var dadosEmpresa = await new EmpresaDAO(_context).SelectEmpresaAdmin(parametros.IdEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.DadosEmpresaAdmin(dadosEmpresa)
            };
        }
    }
}