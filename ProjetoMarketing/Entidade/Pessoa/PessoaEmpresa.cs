using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Pessoa
{
    [Table("pessoaempresa")]
    public class PessoaEmpresa
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("idpessoa")]
        public Guid IdPessoa { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("nota")]
        public decimal? Nota { get; set; }
        [Column("comentario")]
        public string Comentario { get; set; }
        [Column("dataavaliacao")]
        public DateTime? DataAvaliacao { get; set; }
    }
}
