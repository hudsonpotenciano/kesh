using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("perfilempresa")]
    public class PerfilEmpresa
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
        [Column("categorias")]
        public int[] Categorias { get; set; }
    }
}
