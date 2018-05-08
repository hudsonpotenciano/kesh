using System.ComponentModel.DataAnnotations;

namespace ProjetoMarketing.Entidade.Pessoa
{
    public class Usuario
    {
        [Key]
        public string Id { get; set; }
        public int IdUsuario { get; set; }
        public string Token { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public int? IdPessoa { get; set; }
    }
}
