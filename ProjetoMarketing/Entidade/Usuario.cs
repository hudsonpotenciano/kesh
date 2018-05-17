using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    public class Usuario
    {
        [Key]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdUsuario { get; set; }
        public string Token { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public int? IdPessoa { get; set; }
        public int? IdEmpresa { get; set; }
    }
}
