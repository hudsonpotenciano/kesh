using System.ComponentModel.DataAnnotations;

namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class Pessoa
    {
        [Key]
        public string Id { get; set; }
        public int IdPessoa { get; set; }
        public string CpfCnpj { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
    }
}
