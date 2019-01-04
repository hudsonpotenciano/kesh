using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("cupom")]
    public class Cupom
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public long Id { get; set; }
        [Column("idcupom")]
        public Guid IdCupom { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("token")]
        public Guid Token { get; set; }
        [Column("idpessoa")]
        public Guid IdPessoa { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
        [Column("datavalidade")]
        public DateTime DataValidade { get; set; }
        [Column("idcompartilhamento")]
        public Guid IdCompartilhamento { get; set; }
    };
}
