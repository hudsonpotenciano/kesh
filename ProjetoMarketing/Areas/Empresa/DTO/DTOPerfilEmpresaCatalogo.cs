using ProjetoMarketing.Entidade.Empresa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.DTO
{
    public class DTOPerfilEmpresaCatalogo
    {
        public PerfilEmpresa Perfil { get; set; }
        public IEnumerable<ImagemCatalogo> Catalogo { get; set; }
    }
}
