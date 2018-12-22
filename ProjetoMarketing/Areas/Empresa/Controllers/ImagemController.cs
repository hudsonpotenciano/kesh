using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Areas.Empresa.Persistencia;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Models;
using System.Linq;
using System.Threading.Tasks;

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

        //[AllowAnonymous]
        //[HttpGet("ObtenhaImagemCatalogo")]
        //public async Task<ActionResult> ObtenhaImagemCatalogo(int idImagem)
        //{
        //    var foto = await new ImagemDAO(null).ObtenhaImagem(idImagem);

        //    if (foto == null)
        //    {
        //        return null;
        //    }

        //    return File(foto, "image/jpeg");
        //}
    }
}