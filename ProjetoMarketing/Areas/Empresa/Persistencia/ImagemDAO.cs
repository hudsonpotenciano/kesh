using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class ImagemDAO
    {
        private readonly string CaminhoImagens = Environment.GetFolderPath(Environment.SpecialFolder.CommonPictures);
        public Task<byte[]> GetImagemCatalogo(long idImagem)
        {
            if (!ImagemExiste(idImagem)) return null;
            return File.ReadAllBytesAsync(CaminhoImagens + idImagem + ".jpg");
        }

        private bool ImagemExiste(long idImagem)
        {
            return File.Exists(CaminhoImagens + idImagem + ".jpg");
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
            var imagensSalvas = context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == parametros.IdPerfilEmpresa);

            foreach (var item in parametros.Imagens.Where(i => i.Imagem != null))
            {
                var imagem = new Entidade.Empresa.ImagemCatalogo()
                {
                    IdPerfilEmpresa = parametros.IdPerfilEmpresa,
                    IdImagem = item.IdImagem
                };

                if (imagem.IdImagem == 0)
                {
                    context.ImagemCatalogo.Add(imagem);
                    context.SaveChanges();
                    item.IdImagem = imagem.IdImagem;
                    SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                }
                else
                {
                    DeleteImagemCatalogo(item.IdImagem);
                    SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                }
            }

            foreach (var item in imagensSalvas.Select(a => a.IdImagem).Except(parametros.Imagens.Select(a => a.IdImagem)))
            {
                DeleteImagemCatalogo(item);
                context.ImagemCatalogo.Remove(imagensSalvas.FirstOrDefault(a => a.IdImagem == item));
                context.SaveChanges();
            }
        }
    }
}
