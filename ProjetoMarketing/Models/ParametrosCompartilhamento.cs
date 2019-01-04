using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosCompartilhamento : ParametrosRequestModel
    {
        public Guid IdPerfilEmpresa { get; set; }
        public Guid IdEmpresa { get; set; }
        public Guid IdPessoa { get; set; }
        public string Codigo { get; set; }
    }
}
