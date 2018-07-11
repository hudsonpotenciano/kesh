using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Pessoa
{
    [Table("perfilpessoa")]
    public class PerfilPessoa
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("foto")]
        public byte[] Foto { get; set; }
    }
}
