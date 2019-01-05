using ProjetoMarketing.Models;
using System;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ParametrosObtenhaEmpresaLoja : ParametrosRequestModel
    {
        public Guid IdEmpresa { get; set; }
        public Guid IdPerfilEmpresa { get; set; }
    }
}
