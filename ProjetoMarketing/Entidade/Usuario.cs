using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("usuario")]
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("idusuario")]
        public Guid IdUsuario { get; set; }
        [Column("token")]
        public string Token { get; set; }
        [Column("tokenempresaadmin")]
        public string TokenEmpresaAdmin { get; set; }
        [Column("login")]
        public string Login { get; set; }
        [Column("idpessoa")]
        public Guid? IdPessoa { get; set; }
        [Column("idempresa")]
        public Guid? IdEmpresa { get; set; }
        [Column("redesocial")]
        public bool RedeSocial { get; set; }

    }
}
