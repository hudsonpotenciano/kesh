using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Areas.Empresa.Persistencia;
using ProjetoMarketing.Areas.Empresa.Servicos;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Data;
using ProjetoMarketing.Models;
using System.Linq;
using System.Threading.Tasks;

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

            Entidade.Empresa.Empresa empresa = new Entidade.Empresa.Empresa();
            Entidade.Usuario usuario = new Entidade.Usuario();

            await new EmpresaDAO(_context).AddEmpresaUsuario(model, out empresa, out usuario);

            if (usuario.IdUsuario != 0)
            {
                RetornoRequestModel retorno = new RetornoRequestModel
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
            await EmpresaService.Instancia.AtualizePerfilEmpresa(parametros, _context);
            return RetornoRequestModel.CrieSucesso();
        }

        [Authorize("Bearer")]
        [HttpPost("CadastrePerfilEmpresa")]
        public async Task<RetornoRequestModel> CadastrePerfilEmpresa([FromBody]CadastroPerfilModel parametros)
        {
            await EmpresaService.Instancia.CadastrePerfilEmpresa(parametros, _context);
            return RetornoRequestModel.CrieSucesso();
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaPerfisDaEmpresaParaSelecao")]
        public async Task<RetornoRequestModel> ObtenhaPerfisDaEmpresaParaSelecao([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            System.Collections.Generic.List<Entidade.Empresa.PerfilEmpresa> perfisEmpresa = await new EmpresaDAO(_context).SelectPerfisEmpresa(parametros.IdEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.ProjecaoPerfisEmpresaParcial(perfisEmpresa)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaDadosEmpresaLoja")]
        public async Task<RetornoRequestModel> ObtenhaDadosEmpresaLoja([FromBody]ParametrosObtenhaEmpresaLoja parametros)
        {
            DTO.DTODadosEmpresaLoja dadosEmpresa = await new EmpresaDAO(_context).SelectEmpresaLoja(parametros.IdEmpresa, parametros.IdPerfilEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.DadosEmpresaLoja(dadosEmpresa)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaDadosEmpresaAdmin")]
        public async Task<RetornoRequestModel> ObtenhaDadosEmpresaAdmin([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            DTO.DTODadosEmpresaAdmin dadosEmpresa = await new EmpresaDAO(_context).SelectEmpresaAdmin(parametros.IdEmpresa);

            return new RetornoRequestModel()
            {
                Result = Projecoes.DadosEmpresaAdmin(dadosEmpresa)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("AddIdNotificacaoEmpresa")]
        public async Task<RetornoRequestModel> AddIdNotificacaoEmpresa([FromBody]PrametrosTokenNotificacao parametros)
        {
            try
            {
                if (string.IsNullOrEmpty(parametros.TokenNotificacao))
                {
                    await new EmpresaDAO(_context).AddIdNotificacao(parametros.IdPerfilEmpresa, parametros.TokenNotificacao);
                }

                return RetornoRequestModel.CrieSucesso();
            }
            catch (System.Exception e)
            {
                return RetornoRequestModel.CrieFalha();
            }
        }
    }
}