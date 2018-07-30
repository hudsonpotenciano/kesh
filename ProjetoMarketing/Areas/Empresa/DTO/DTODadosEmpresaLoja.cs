using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Empresa.DTO
{
    public class DTODadosEmpresaLoja
    {
        public Entidade.Empresa.Empresa Empresa { get; set; }
        public Entidade.Empresa.PerfilEmpresa PerfilEmpresa { get; set; }
        public Entidade.Empresa.ContaEmpresa ContaEmpresa { get; set; }
        public IEnumerable<Entidade.Empresa.ImagemCatalogo> ImagensCatalogo { get; set; }

    }
}
