using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.DTO
{
    public class DTOVendasAdminLoja
    {
        public Venda Venda { get; set; }
        public string NomeLoja { get; set; }
    }
}
