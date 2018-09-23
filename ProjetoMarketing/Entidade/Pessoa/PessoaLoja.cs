using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Entidade.Pessoa
{
    [Table("pessoaloja")]
    public class PessoaLoja
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idpessoaloja")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdPessoaLoja { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("pontos")]
        public decimal Pontos { get; set; }
    }
}
