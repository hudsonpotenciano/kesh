using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class ImagemDAO
    {
        private readonly PessoaEmpresaContext _context;
        public ImagemDAO(PessoaEmpresaContext contexto)
        {
            _context = contexto;
        }

        private readonly CloudStorageAccount storageAccount =
            new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("storageprojetomarketing", "Uv+eBC5nQPUL7aU0IFjwQP5Utht0cPkCzEZMOZnaP/D1hUr7FtuBHd+LI0nNs2rsLGVnjjKe5UoRGH5dVm1tqg=="), true);
        private const string containerName = "imagens";
        private const string imageType = ".jpg";

        private Task SaveImagemCatalogo(byte[] imagem, long idImagem)
        {
            try
            {
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(idImagem + imageType);
                return blockBlob.UploadFromByteArrayAsync(imagem, 0, imagem.Length);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        private void DeleteImagemCatalogo(long idImagem)
        {
            try
            {
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(idImagem + imageType);
                blockBlob.DeleteAsync();
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public async Task<byte[]> ObtenhaImagem(long idImagem)
        {
            try
            {
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                CloudBlockBlob blockBlob = container.GetBlockBlobReference(idImagem + imageType);

                MemoryStream memStream = new MemoryStream();

                await blockBlob.DownloadToStreamAsync(memStream);

                return memStream.ToArray();
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public void AtualizeImagensCatalogo(List<ImagemCatalogoModel> Imagens, long idPerfilEmpresa)
        {
            try
            {
                IQueryable<Entidade.Empresa.ImagemCatalogo> imagensSalvas = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == idPerfilEmpresa);

                foreach (Models.ImagemCatalogoModel item in Imagens.Where(i => i.Imagem != null))
                {
                    Entidade.Empresa.ImagemCatalogo imagem = new Entidade.Empresa.ImagemCatalogo()
                    {
                        IdPerfilEmpresa = idPerfilEmpresa,
                        IdImagem = item.IdImagem
                    };

                    if (imagem.IdImagem == 0)
                    {
                        _context.ImagemCatalogo.Add(imagem);
                        _context.SaveChanges();
                        item.IdImagem = imagem.IdImagem;
                        SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                    }
                    else
                    {
                        DeleteImagemCatalogo(item.IdImagem);
                        SaveImagemCatalogo(item.Imagem, imagem.IdImagem);
                    }
                }

                foreach (long item in imagensSalvas.Select(a => a.IdImagem).Except(Imagens.Select(a => a.IdImagem)))
                {
                    DeleteImagemCatalogo(item);
                    _context.ImagemCatalogo.Remove(imagensSalvas.FirstOrDefault(a => a.IdImagem == item));
                    _context.SaveChanges();
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
