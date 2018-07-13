using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosCompartilhamento : ParametrosRequestModel
    {
        public int IdEmpresa { get; set; }
        public int IdPessoa { get; set; }
        public int[] IdsPessoas { get; set; }
    }
}
