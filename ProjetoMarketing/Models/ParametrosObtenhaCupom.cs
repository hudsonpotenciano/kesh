using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaCupom : ParametrosRequestModel
    {
        public Guid CupomToken { get; set; }
        public int IdEmpresa { get; set; }
    }
}
