using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaNotasComentarios : ParametrosRequestModel
    {
        public Guid IdPessoa { get; set; }
        public Guid IdPerfilEmpresa { get; set; }
    }
}
