using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("imagemperfil")]

    public class ImagemPerfil
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idpessoa")]
        public int? IdPessoa { get; set; }
        [Column("idempresa")]
        public int? IdEmpresa { get; set; }
        [Column("imagem")]
        public byte[] Imagem { get; set; }
    }
}
