using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Persistencia
{
    public class ImagemDAO
    {
        private readonly CloudStorageAccount storageAccount =
        new CloudStorageAccount(new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials("keshstorage", "c0Tb2XmUN9fN/FTzPJGqvNUo49OfEvPlOvY5lkCPDMXQ2qGuoaObUdlPbEqft1Ch4cyrPFmAK8xW1J9uBDuxQw=="), true);
        public const string imageType = ".jpg";
        private readonly PessoaEmpresaContext _context;
        public ImagemDAO(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            if (_context.Database.CurrentTransaction != null)
            {
                _context.Database.CurrentTransaction.Commit();
            }

            _context.Database.BeginTransaction();
        }

        public void SaveImagemPerfilEmpresa(ImagemPerfil imagemPerfil, string container)
        {
            if (imagemPerfil.IdEmpresa == null || imagemPerfil.IdEmpresa.Equals(Guid.Empty))
            {
                return;
            }

            SaveImagem(imagemPerfil.Imagem, imagemPerfil.IdEmpresa.ToString(), container);
        }

        public void SaveImagemPerfilPessoa(ImagemPerfil imagemPerfil, string container)
        {
            if (imagemPerfil.IdPessoa == null || imagemPerfil.IdPessoa.Equals(Guid.Empty))
            {
                return;
            }

            SaveImagem(imagemPerfil.Imagem, imagemPerfil.IdPessoa.ToString(), container);
        }

        private void SaveImagemCatalogoContainer(byte[] imagem, string guidImagem, string container)
        {
            SaveImagem(imagem, guidImagem, container);
        }

        private void SaveImagem(byte[] imagem, string guidImagem, string containerName)
        {
            if (imagem == null)
            {
                return;
            }

            try
            {
                Task.Factory.StartNew(() =>
                {
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(containerName);
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(guidImagem + imageType);
                    blockBlob.UploadFromByteArrayAsync(imagem, 0, imagem.Length);
                });
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public void DeleteImagem(string guidImagem, string nomeContainer)
        {
            try
            {
                Task.Factory.StartNew(() =>
                {
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(nomeContainer);
                    CloudBlockBlob blockBlob = container.GetBlockBlobReference(guidImagem + imageType);
                    blockBlob.DeleteAsync();
                });
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        private void DeleteImagemCatalogoContainer(string guidImagem, string nomeContainer)
        {
            if (string.IsNullOrWhiteSpace(guidImagem))
            {
                return;
            }

            DeleteImagem(guidImagem, nomeContainer);
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
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task AtualizeImagensCatalogo(List<ImagemCatalogoModel> Imagens, Guid idPerfilEmpresa, string container)
        {
            try
            {
                IQueryable<Entidade.Empresa.ImagemCatalogo> imagensSalvas = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa.Equals(idPerfilEmpresa));

                foreach (ImagemCatalogoModel item in Imagens.Where(i => i.Imagem != null))
                {
                    Entidade.Empresa.ImagemCatalogo imagem = new Entidade.Empresa.ImagemCatalogo()
                    {
                        IdPerfilEmpresa = idPerfilEmpresa,
                        IdImagem = Guid.NewGuid()
                    };

                    if (string.IsNullOrWhiteSpace(imagem.GuidImagem))
                    {
                        imagem.GuidImagem = Guid.NewGuid().ToString();
                        _context.ImagemCatalogo.Add(imagem);
                        item.IdImagem = imagem.IdImagem;
                        SaveImagemCatalogoContainer(item.Imagem, imagem.GuidImagem, container);
                    }
                    else
                    {
                        DeleteImagemCatalogoContainer(item.Guid, container);
                        SaveImagemCatalogoContainer(item.Imagem, imagem.GuidImagem, container);
                    }
                }

                foreach (string guid in imagensSalvas.Select(a => a.GuidImagem).Except(Imagens.Select(a => a.Guid)))
                {
                    DeleteImagemCatalogoContainer(guid, container);
                    _context.ImagemCatalogo.Remove(imagensSalvas.FirstOrDefault(a => a.GuidImagem == guid));
                }

                return _context.SaveChangesAsync();
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
