using ProjetoMarketing.Entidade.Empresa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.DTO
{
    public class DTOPessoaLoja
    {
        public PerfilEmpresa Loja { get; set; }
        public decimal Pontos { get; set; }
        public decimal PontosEmDinheiro { get; set; }
    }
}
