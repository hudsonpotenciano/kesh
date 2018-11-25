using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Persistencia;
using System.Collections.Generic;

namespace ProjetoMarketing.Servicos
{
    public class ImagemService
    {
        private readonly PessoaEmpresaContext _context;
        private readonly ImagemDAO _objetoDeAcesso;
        private const string UrlStorage = "https://storageprojetomarketing.blob.core.windows.net";
        private const string containerCatalogo = "imagens";
        private const string containerPerfilPessoa = "perfilpessoa";
        private const string containerPerfilEmpresa = "perfilempresa";

        public ImagemService(PessoaEmpresaContext contexto)
        {
            _context = contexto;
            _objetoDeAcesso = new ImagemDAO(contexto);
        }

        public void AtualizeImagensCatalogo(List<ImagemCatalogoModel> imagens, long idPerfilEmpresa)
        {
            _objetoDeAcesso.AtualizeImagensCatalogo(imagens, idPerfilEmpresa, containerCatalogo);
        }

        public void SaveImagemPerfilEmpresa(ImagemPerfil imagem)
        {
            _objetoDeAcesso.SaveImagemPerfilEmpresa(imagem, containerPerfilEmpresa);
        }

        public void SaveImagemPerfilPessoa(ImagemPerfil imagem)
        {
            _objetoDeAcesso.SaveImagemPerfilPessoa(imagem, containerPerfilPessoa);
        }

        //public static string ObtenhaUrlImagemPessoa(int idPessoa)
        //{
        //    return $"{UrlStorage}/{containerPerfilPessoa}/{idPessoa}{ImagemDAO.imageType}";
        //}

        //public static string ObtenhaUrlImagemEmpresa(int idEmpresa)
        //{
        //    return $"{UrlStorage}/{containerPerfilEmpresa}/{idEmpresa}{ImagemDAO.imageType}";
        //}
    }
}
