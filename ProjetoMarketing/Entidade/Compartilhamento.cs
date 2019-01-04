using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("compartilhamento")]
    public class Compartilhamento
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Column("idcompartilhamento")]
        public Guid IdComartilhamento { get; set; }
        [Column("idpessoa")]
        public Guid IdPessoa { get; set; }
        [Column("codigo")]
        public string Codigo { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
        [Column("cupomfoigerado")]
        public bool CupomFoiGerado { get; set; }
    }
}
