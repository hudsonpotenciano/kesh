using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Areas.Pessoa.Models;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Data;
using System.Threading.Tasks;
using ProjetoMarketing.Contexts;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa/Pessoa")]
    public class PessoaController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;

        public PessoaController(PessoaEmpresaContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("CadastrePessoa")]
        public async Task<RetornoRequestModel> CadastrePessoa([FromBody] ParametrosCadastroPessoa model,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (_context.Pessoa.Any(p => p.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }


            var pessoa = new Entidade.Pessoa.Pessoa();
            var usuario = new Entidade.Usuario();

            await new PessoaDAO(_context).AddPessoaUsuario(model, out pessoa, out usuario);

            if (usuario.IdUsuario != 0)
            {
                var retorno = new RetornoRequestModel
                {
                    Result = Projecoes.ProjecaoRetornoCadastroPessoaUsuario(usuario, GenerateAcessToken(usuario.Login, signingConfigurations, tokenConfigurations))
                };

                return retorno;
            }

            return RetornoRequestModel.CrieFalha();
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaDadosPessoa")]
        public async Task<RetornoRequestModel> ObtenhaDadosPessoa([FromBody]ParametrosObtenhaDadosPessoa parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.DadosPessoa(await new PessoaDAO(_context).Select(parametros.IdPessoa))
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaPessoaEPerfilEmpresas")]
        public async Task<RetornoRequestModel> ObtenhaPessoaEPerfilEmpresas([FromBody]ParametrosObtenhaPessoaEPerfilEmpresas parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.PessoaEmpresas(await new PessoaDAO(_context).ObtenhaPessoaEmpresas(parametros))
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaComentarioENotaPessoasEmpresas")]
        public async Task<RetornoRequestModel> ObtenhaComentarioENotaPessoasEmpresas([FromBody]ParametrosObtenhaNotasComentarios parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var pessoaEmpresas = await new PessoaDAO(_context).ObtenhaComentarioENotaPessoasEmpresas(parametros);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.NotasEComentariosPessoasEmpresas(pessoaEmpresas)
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaPessoaParaCompartilhamento")]
        public async Task<RetornoRequestModel> ObtenhaPessoaParaCompartilhamento([FromBody]ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var pessoas = await new PessoaDAO(_context).ObtenhaPessoasCompartilhamento(parametros);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.PessoasCompartilhamento(pessoas)
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("AtualizeDadosPessoaEmpresa")]
        public async Task<RetornoRequestModel> AtualizeDadosPessoaEmpresa([FromBody]ParametrosAtualizeDadosPessoaEmpresa parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            try
            {
                await new PessoaDAO(_context).AddOrUpdatePessoaEmpresa(parametros);
                return RetornoRequestModel.CrieSucesso();
            }
            catch
            {
                return RetornoRequestModel.CrieFalha();
            }
        }

        //[Authorize("Bearer")]
        //[HttpGet("AtualizeFotoPessoa")]
        //public async Task<RetornoRequestModel> AtualizeFotoPessoa([FromBody] ParametrosAtualizeFoto parametros)
        //{
        //    if (!EstaAutenticado(_contextUsuario, parametros.Token))
        //        return RetornoRequestModel.CrieFalhaLogin();

        //    await new PessoaDAO(_context).UpdateImagemPerfil(parametros);

        //    return RetornoRequestModel.CrieSucesso();
        //}

        [AllowAnonymous]
        [HttpGet("ObtenhaFotoPessoa")]
        public ActionResult ObtenhaFotoPessoa(int idPessoa)
        {
            var foto = _context.ImagemPerfil.First(p => p.IdPessoa == idPessoa)?.Imagem;

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }
    }
}