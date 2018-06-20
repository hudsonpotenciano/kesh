using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Pessoa
{
    public class Pessoa
    {
        [Key]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdPessoa { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
    }
}
