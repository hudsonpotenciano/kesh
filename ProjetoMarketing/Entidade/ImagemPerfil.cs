using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    public class ImagemPerfil
    {
        public Guid Id { get; set; }
        public int? IdPessoa { get; set; }
        public int? IdEmpresa { get; set; }
        public byte[] Imagem { get; set; }
    }
}
