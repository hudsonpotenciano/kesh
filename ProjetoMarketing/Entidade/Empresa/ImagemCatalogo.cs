using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("imagemcatalogo")]
    public class ImagemCatalogo
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Column("idimagem")]
        public Guid IdImagem { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("guidimagem")]
        public string GuidImagem { get; set; }
    }
}
