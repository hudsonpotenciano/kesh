using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Pessoa
{
    [Table("pessoa")]
    public class Pessoa
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("latitude")]
        public double Latitude { get; set; }
        [Column("longitude")]
        public double Longitude { get; set; }
        [Column("idsnotificacao")]
        public string[] IdsNotificacao { get; set; }
    }
}
