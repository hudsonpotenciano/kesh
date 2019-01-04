using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("venda")]
    public class Venda
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("idvenda")]
        public Guid IdVenda { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("idpessoa")]
        public Guid IdPessoa { get; set; }
        [Column("idcupom")]
        public Guid IdCupom { get; set; }
        [Column("valor")]
        public decimal Valor { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
    }
}
