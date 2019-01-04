using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosAtualizeDadosPessoaEmpresa : ParametrosRequestModel
    {
        public decimal Nota { get; set; }
        public string Comentario { get; set; }
        public Guid IdPessoa { get; set; }
        public Guid IdPerfilEmpresa { get; set; }
    }
}
