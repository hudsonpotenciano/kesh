using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoMarketing.Entidade.Empresa
{
    public class PerfilEmpresa
    {
        [Key]
        public Guid Id { get; set; }
        public int IdEmpresa { get; set; }
        public string Resumo { get; set; }
        public decimal DescontoCompartilhamento { get; set; }
        public decimal ValorPontos { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int[] Categorias { get; set; }
    }
}
