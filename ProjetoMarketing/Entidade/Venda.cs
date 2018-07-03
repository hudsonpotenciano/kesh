using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    public class Venda
    {
        [Key]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdVenda { get; set; }
        public int IdEmpresa { get; set; }
        public int IdPessoa { get; set; }
        public long IdCupom { get; set; }
        public decimal Valor { get; set; }
    }
}
