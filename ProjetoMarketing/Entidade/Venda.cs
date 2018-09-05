using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("venda")]
    public class Venda
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("idvenda")]
        public int IdVenda { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("idcupom")]
        public long IdCupom { get; set; }
        [Column("valor")]
        public decimal Valor { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
    }
}
