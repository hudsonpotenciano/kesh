using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosCupomVenda : ParametrosRequestModel
    {
        public Guid TokenCupom { get; set; }
        public decimal ValorDaVenda { get; set; }
        public bool UsarPontos { get; set; }
    }
}
