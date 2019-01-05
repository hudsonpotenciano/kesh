using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    public class Adesao
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column("idadesao")]
        public Guid IdAdesao { get; set; }
        [Column("idempresa")]
        public Guid IdEmpresa { get; set; }
        [Column("ultimaatualizacao")]
        public DateTime UltimaAtualizacao { get; set; }
        [Column("disponivel")]
        public bool Disponivel { get; set; }
    }
}
