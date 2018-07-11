using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Entidade.Empresa
{
    [Table("imagensempresa")]
    public class ImagensEmpresa
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }
        [Column("idempresa")]
        public int IdEmpresa { get; set; }
        [Column("imagem")]
        public byte[] Imagem { get; set; }
        [Column("tipo")]
        public int Tipo { get; set; }
    }
}
