using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroPerfilModel : ParametrosRequestModel
    {
        public int IdEmpresa { get; set; }
        public string Descricao { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Telefone { get; set; }
        public string Telefone2 { get; set; }
    }
}
