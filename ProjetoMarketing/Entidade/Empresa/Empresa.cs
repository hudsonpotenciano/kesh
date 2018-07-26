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
    }
}
