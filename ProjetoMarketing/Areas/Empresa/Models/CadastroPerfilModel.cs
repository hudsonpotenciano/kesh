using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroPerfilModel : ParametrosRequestModel
    {
        public Guid IdEmpresa { get; set; }
        public Guid IdPerfilEmpresa { get; set; }
        public string Descricao { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Telefone { get; set; }
        public string Telefone2 { get; set; }
        public List<ImagemCatalogoModel> Catalogo { get; set; }
    }
}
