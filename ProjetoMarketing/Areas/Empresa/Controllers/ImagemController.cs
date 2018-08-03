using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Areas.Empresa.Persistencia;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Models;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa/Imagem")]
    public class ImagemController : ControladorBase
    {
        private readonly PessoaEmpresaContext _context;

        public ImagemController(PessoaEmpresaContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("ObtenhaLogoEmpresa")]
        public ActionResult ObtenhaLogoEmpresa(int idEmpresa)
        {
            var foto = _context.ImagemPerfil.FirstOrDefault(x => x.IdEmpresa == idEmpresa)?.Imagem;

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }

        [AllowAnonymous]
        [HttpGet("ObtenhaImagemCatalogo")]
        public async Task<ActionResult> ObtenhaImagemCatalogo(int idImagem)
        {
            var foto = await new ImagemDAO().GetImagemCatalogo(idImagem);

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }

        [Authorize("Bearer")]
        [HttpPost("AtualizeCatalogo")]
        public async Task<RetornoRequestModel> AtualizeCatalogo([FromBody]ParametrosAtualizeImagensCatalogo parametros)
        {
            if (!EstaAutenticado(_context, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            try
            {
                await Task.Factory.StartNew(() =>
                {
                    new ImagemDAO().AtualizeImagensCatalogo(parametros, _context);
                });

                return RetornoRequestModel.CrieSucesso();
            }
            catch
            {
                return RetornoRequestModel.CrieFalha();
            }
        }
    }
}