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
        public Guid Id { get; set; }
        [Column("idimagem")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long IdImagem { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("guidimagem")]
        public string GuidImagem { get; set; }
    }
}
