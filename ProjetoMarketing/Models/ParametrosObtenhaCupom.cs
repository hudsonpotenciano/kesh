using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaCupom : ParametrosRequestModel
    {
        public Guid IdPerfilEmpresa { get; set; }
        public Guid CupomToken { get; set; }
    }
}
