using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("empresa")]
    public class Empresa
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idempresa")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdEmpresa { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("cnpj")]
        public string Cnpj { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("telefone")]
        public string Telefone { get; set; }
        [Column("telefone2")]
        public string Telefone2 { get; set; }
        [Column("latitude")]
        public double Latitude { get; set; }
        [Column("longitude")]
        public double Longitude { get; set; }
    }
}
