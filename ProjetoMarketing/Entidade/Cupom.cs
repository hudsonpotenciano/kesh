using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    public class Cupom
    {
        [Key]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Token { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long IdCupom { get; set; }
        public int IdPessoa { get; set; }
        public int IdEmpresa { get; set; }
        public decimal Desconto { get; set; }
        public DateTime Validade { get; set; }
    }
}
