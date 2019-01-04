using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class AtualizeContaModel : ParametrosRequestModel
    {
        public Guid IdEmpresa { get; set; }
        public string Resumo { get; set; }
        public decimal ValorPontos { get; set; }
        public int Categoria { get; set; }
        public byte[] Logo { get; set; }
    }
}
