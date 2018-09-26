using ProjetoMarketing.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.DTO
{
    public class DTOCupomParaVenda
    {
        public Cupom Cupom { get; set; }
        public decimal TotalDinheiroPessoa { get; set; }
    }
}
