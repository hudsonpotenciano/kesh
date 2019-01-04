using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("perfilempresa")]
    public class PerfilEmpresa
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [Column("idperfilempresa")]
        public Guid IdPerfilEmpresa { get; set; }
        [Column("idempresa")]
        public Guid IdEmpresa { get; set; }
        [Column("descricao")]
        public string Descricao { get; set; }
        [Column("latitude")]
        public double Latitude { get; set; }
        [Column("longitude")]
        public double Longitude { get; set; }
        [Column("telefone")]
        public string Telefone { get; set; }
        [Column("telefone2")]
        public string Telefone2 { get; set; }
        [Column("idsnotificacao")]
        public List<string> IdsNotificacao { get; set; }
    }
}
