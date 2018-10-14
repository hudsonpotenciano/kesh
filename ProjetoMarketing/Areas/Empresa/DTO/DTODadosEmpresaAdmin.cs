using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Empresa.DTO
{
    public class DTODadosEmpresaAdmin
    {
        public Entidade.Empresa.Empresa Empresa { get; set; }
        public IEnumerable<DTOPerfilEmpresaCatalogo> PerfisEmpresaCatalogo { get; set; }
        public Entidade.Empresa.ContaEmpresa ContaEmpresa { get; set; }
    }
}
