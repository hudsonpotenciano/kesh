using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class ImagemDAO
    {
        //private readonly Contexts.PessoaEmpresaContext _context;

        //public ImagemDAO(Contexts.PessoaEmpresaContext context)
        //{
        //    _context = context;
        //}

        private const string CaminhoImagens = @"D:\ImagensProjetoMarketing\";
        public Task<byte[]> GetImagemCatalogo(long idImagem)
        {
            return File.ReadAllBytesAsync(CaminhoImagens + idImagem + ".jpg");
        }

        private Task SaveImagemCatalogo(byte[] imagem, long idImagem)
        {
            return File.WriteAllBytesAsync(CaminhoImagens + idImagem + ".jpg", imagem);
        }

        private void DeleteImagemCatalogo(long idImagem)
        {
            File.Delete(CaminhoImagens + idImagem + ".jpg");
        }

        public void AtualizeImagensCatalogo(Models.ParametrosAtualizeImagensCatalogo parametros, Contexts.PessoaEmpresaContext context)
        {
            var imagensSalvas = context.ImagemCatalogo.Where(a => a.IdEmpresa == parametros.IdEmpresa);

            context.ImagemCatalogo.RemoveRange(imagensSalvas);

            foreach (var img in imagensSalvas)
            {
                DeleteImagemCatalogo(img.IdImagem);
            }

            foreach (var bytea in parametros.Imagens)
            {
                var imagem = new Entidade.Empresa.ImagemCatalogo()
                {
                    IdEmpresa = parametros.IdEmpresa
                };

                context.ImagemCatalogo.Add(imagem);
                context.SaveChanges();
                
                SaveImagemCatalogo(bytea, imagem.IdImagem);
            }
        }
    }
}
