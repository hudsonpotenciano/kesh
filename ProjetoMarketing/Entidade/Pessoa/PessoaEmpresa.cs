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
        [Column("idempresa")]
        public int IdEmpresa { get; set; }
        [Column("pontuacao")]
        public int? Pontuacao { get; set; }
        [Column("nota")]
        public int? Nota { get; set; }
        [Column("comentario")]
        public string Comentario { get; set; }
    }
}
