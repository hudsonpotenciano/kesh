using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ImagemCatalogoModel
    {
        public byte[] Imagem { get; set; }
        public long IdImagem { get; set; }
        public string Guid { get; set; }
    }
}
