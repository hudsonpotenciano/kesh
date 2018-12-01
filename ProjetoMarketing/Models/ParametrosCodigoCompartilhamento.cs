using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosCodigoCompartilhamento : ParametrosRequestModel
    {
        public int IdPessoaReceptor { get; set; }
        public string Codigo { get; set; }
    }
}
