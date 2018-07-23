namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class ParametrosAtualizeImagensCatalogo : ProjetoMarketing.Models.ParametrosRequestModel
    {
        public byte[][] Imagens { get; set; }
        public int IdEmpresa { get; set; }
    }
}
