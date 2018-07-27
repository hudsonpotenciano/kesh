using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Empresa
{
    public class DTODadosEmpresa
    {
        public Entidade.Empresa.Empresa Empresa { get; set; }
        public List<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }
        public Entidade.Empresa.ContaEmpresa ContaEmpresa { get; set; }
        public List<Entidade.Empresa.ImagemCatalogo> ImagensCatalogo { get; set; }
    }
}
