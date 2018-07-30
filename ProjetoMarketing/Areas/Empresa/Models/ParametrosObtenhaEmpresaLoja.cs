using ProjetoMarketing.Models;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ParametrosObtenhaEmpresaLoja : ParametrosRequestModel
    {
        public int IdEmpresa { get; set; }
        public int IdPerfilEmpresa { get; set; }
    }
}
