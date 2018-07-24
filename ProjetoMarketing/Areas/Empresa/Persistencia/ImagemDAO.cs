using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class ImagemDAO
    {
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
            var imagensSalvas = context.ImagemCatalogo.Where(a=>a.IdEmpresa == parametros.IdEmpresa);

            foreach (var item in parametros.Imagens)
            {
                var imagem = new Entidade.Empresa.ImagemCatalogo()
                {
                    IdEmpresa = parametros.IdEmpresa,
                    IdImagem = item.IdImagem
                };

                if (imagem.IdImagem == 0)
                {
                    context.ImagemCatalogo.Add(imagem);
                    context.SaveChanges();
                    SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                }
                else
                {
                    DeleteImagemCatalogo(item.IdImagem);
                    SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                }
            }

            foreach (var item in imagensSalvas.Select(a=>a.IdImagem).Except(parametros.Imagens.Select(a=>a.IdImagem)))
            {
                DeleteImagemCatalogo(item);
                context.ImagemCatalogo.Remove(imagensSalvas.FirstOrDefault(a => a.IdImagem == item));
            }
        }
    }
}
