using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    public class ImagemPerfil
    {
        public Guid? IdPessoa { get; set; }
        public Guid? IdEmpresa { get; set; }
        public byte[] Imagem { get; set; }
        //public string GuidImagem { get; set; }
    }
}
