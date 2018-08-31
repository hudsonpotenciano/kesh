using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class PerfilEmpresaDistanciaModel
    {
        [DisplayName("idperfilempresa")]
        public int IdPerfilEmpresa { get; set; }
        [DisplayName("distancia")]
        public int Distancia { get; set; }
    }
}
