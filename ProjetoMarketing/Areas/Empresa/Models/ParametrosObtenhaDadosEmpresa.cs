using ProjetoMarketing.Models;
using System;

namespace ProjetoMarketing.Entidade.Empresa.Models
{
    public class ParametrosObtenhaDadosEmpresa : ParametrosRequestModel
    {
        public Guid IdEmpresa { get; set; }
    }
}
