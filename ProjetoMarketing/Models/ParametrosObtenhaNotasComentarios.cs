using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaNotasComentarios : ParametrosRequestModel
    {
        public int IdPessoa { get; set; }
        public int IdEmpresa { get; set; }

    }
}
