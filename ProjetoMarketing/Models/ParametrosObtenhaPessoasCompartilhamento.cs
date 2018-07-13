using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaPessoasCompartilhamento : ParametrosRequestModel
    {
        public int IdPessoa { get; set; }
        public int IdEmpresa { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
