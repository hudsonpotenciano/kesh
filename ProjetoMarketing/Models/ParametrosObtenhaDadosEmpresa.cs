using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ParametrosObtenhaDadosEmpresa : ParametrosRequestModel
    {
        public Guid IdEmpresa { get; set; }
    }
}
