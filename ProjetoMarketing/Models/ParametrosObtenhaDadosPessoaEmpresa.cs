using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaDadosEmpresaLoja : ParametrosRequestModel
    {
        public Guid IdPerfilEmpresa { get; set; }
    }
}
