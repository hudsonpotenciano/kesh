using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Persistencia
{
    public class ImagemDAO
    {
        private readonly CloudStorageAccount storageAccount =
        new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("keshstorage", "uQ38I7/WISwdvlgg2JYztJjfzR1Yb5rfknp/DPYyi9W6Aa+fEZSaLecixteMDKR6zepty881+hNrqvpb9QSpfw=="), true);
        public const string imageType = ".jpg";
        private readonly PessoaEmpresaContext _context;
        public ImagemDAO(PessoaEmpresaContext contexto)
        {
            _context = contexto;
        }

        public void SaveImagemPerfilEmpresa(ImagemPerfil imagemPerfil, string container)
        {
            if (imagemPerfil.IdEmpresa == null || imagemPerfil.IdEmpresa == 0)
            {
                return;
            }

            SaveImagem(imagemPerfil.Imagem, (int)imagemPerfil.IdEmpresa, container);
        }

        public void SaveImagemPerfilPessoa(ImagemPerfil imagemPerfil, string container)
        {
            if (imagemPerfil.IdPessoa == null || imagemPerfil.IdPessoa == 0)
            {
                return;
            }

            SaveImagem(imagemPerfil.Imagem, (int)imagemPerfil.IdPessoa, container);
        }

        private void SaveImagemCatalogoContainer(byte[] imagem, long idImagem, string container)
        {
            SaveImagem(imagem, idImagem, container);
        }

        private void SaveImagem(byte[] imagem, long idImagem, string containerName)
        {
            try
            {
                Task.Factory.StartNew(() =>
                {
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(idImagem + imageType);
                    blockBlob.UploadFromByteArrayAsync(imagem, 0, imagem.Length);
                });
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        private void DeleteImagemCatalogoContainer(long idImagem, string nomeContainer)
        {
            try
            {
                Task.Factory.StartNew(() =>
                {
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(nomeContainer);
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(idImagem + imageType);
                    blockBlob.DeleteAsync();
                });
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public async Task<byte[]> ObtenhaImagem(long idImagem, string nomeContainer)
        {
            try
            {
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                CloudBlobContainer container = blobClient.GetContainerReference(nomeContainer);
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

        public void AtualizeImagensCatalogo(List<ImagemCatalogoModel> Imagens, long idPerfilEmpresa, string container)
        {
            try
            {
                IQueryable<Entidade.Empresa.ImagemCatalogo> imagensSalvas = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == idPerfilEmpresa);

                foreach (ImagemCatalogoModel item in Imagens.Where(i => i.Imagem != null))
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
                        SaveImagemCatalogoContainer(item.Imagem, imagem.IdImagem, container);
                    }
                    else
                    {
                        DeleteImagemCatalogoContainer(item.IdImagem, container);
                        SaveImagemCatalogoContainer(item.Imagem, imagem.IdImagem, container);
                    }
                }

                foreach (long item in imagensSalvas.Select(a => a.IdImagem).Except(Imagens.Select(a => a.IdImagem)))
                {
                    DeleteImagemCatalogoContainer(item, container);
                    _context.ImagemCatalogo.Remove(imagensSalvas.FirstOrDefault(a => a.IdImagem == item));
                    _context.SaveChangesAsync();
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
