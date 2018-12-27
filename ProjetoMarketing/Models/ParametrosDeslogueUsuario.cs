using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosDeslogueUsuario : ParametrosRequestModel
    {
        public int IdPessoa { get; set; }
        public int IdPerfilEmpresa { get; set; }
        public string IdNotificacao { get; set; }
    }
}
