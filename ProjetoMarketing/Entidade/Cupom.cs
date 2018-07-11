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
        [Column("idempresa")]
        public int IdEmpresa { get; set; }
        [Column("desconto")]
        public decimal Desconto { get; set; }
        [Column("validade")]
        public DateTime Validade { get; set; }
    }
}
