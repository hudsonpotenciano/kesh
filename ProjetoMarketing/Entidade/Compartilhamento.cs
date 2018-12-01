using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade
{
    [Table("compartilhamento")]
    public class Compartilhamento
    {
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idcompartilhamento")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long IdCompartilhamento { get; set; }
        [Column("idpessoa")]
        public int IdPessoa { get; set; }
        [Column("codigo")]
        public string Codigo { get; set; }
        [Column("idperfilempresa")]
        public long IdPerfilEmpresa { get; set; }
        [Column("data")]
        public DateTime Data { get; set; }
    }
}
