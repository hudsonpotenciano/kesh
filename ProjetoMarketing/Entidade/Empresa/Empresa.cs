using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("empresa")]
    public class Empresa
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("idempresa")]
        public Guid IdEmpresa { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("cnpj")]
        public string Cnpj { get; set; }
        [Column("email")]
        public string Email { get; set; }
    }
}
