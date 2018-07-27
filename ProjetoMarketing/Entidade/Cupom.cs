using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("cupom")]
    public class Cupom
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("token")]
        public Guid Token { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("idcupom")]
        public long IdCupom { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("desconto")]
        public decimal Desconto { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
        [Column("idcompartilhamento")]
        public long IdCompartilhamento { get; set; }
    };
}
