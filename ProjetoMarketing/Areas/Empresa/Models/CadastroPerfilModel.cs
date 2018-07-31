using ProjetoMarketing.Models;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroPerfilModel : ParametrosRequestModel
    {
        public long IdPerfilEmpresa { get; set; }
        public string Descricao { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Telefone { get; set; }
        public string Telefone2 { get; set; }
    }
}
