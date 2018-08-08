using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("contaempresa")]
    public class ContaEmpresa
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idempresa")]
        public int IdEmpresa { get; set; }
        [Column("resumo")]
        public string Resumo { get; set; }
        [Column("descontocompartilhamento")]
        public decimal DescontoCompartilhamento { get; set; }
        [Column("valorpontos")]
        public decimal ValorPontos { get; set; }
        [Column("categoria")]
        public int Categoria { get; set; }
    }
}
