using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("usuario")]
    public class Usuario
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("idusuario")]
        public int IdUsuario { get; set; }
        [Column("token")]
        public string Token { get; set; }
        [Column("login")]
        public string Login { get; set; }
        [Column("idpessoa")]
        public int? IdPessoa { get; set; }
        [Column("idempresa")]
        public int? IdEmpresa { get; set; }
    }
}
