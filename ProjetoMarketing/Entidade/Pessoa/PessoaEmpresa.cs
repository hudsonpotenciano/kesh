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
        public Guid Id { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("nota")]
        public decimal? Nota { get; set; }
        [Column("comentario")]
        public string Comentario { get; set; }
        [Column("dataavaliacao")]
        public DateTime? DataAvaliacao { get; set; }
    }
}
