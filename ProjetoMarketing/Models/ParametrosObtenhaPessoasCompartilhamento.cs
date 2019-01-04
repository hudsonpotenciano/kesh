using ProjetoMarketing.Negocio.Enumeradores;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Models
{
    public class ParametrosObtenhaPessoasCompartilhamento : ParametrosRequestModel
    {
        public Guid IdPessoa { get; set; }
        public Guid IdPerfilEmpresa { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Enumeradores.UnidadeMedidaLocalizacao UnidadeDeMedida { get; set; }
    }
}
