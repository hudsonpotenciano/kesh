using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ParametrosAtualizeImagensCatalogo : ProjetoMarketing.Models.ParametrosRequestModel
    {
        public List<ImagemCatalogoModel> Imagens { get; set; }
        public int IdEmpresa { get; set; }
    }
}
