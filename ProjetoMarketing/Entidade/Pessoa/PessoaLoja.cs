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
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Column("idpessoaloja")]
        public Guid IdPessoaLoja { get; set; }        
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("idpessoa")]
        public Guid IdPessoa { get; set; }
        [Column("pontos")]
        public decimal Pontos { get; set; }
    }
}
