using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Entidade
{
    public class Venda
    {
        [Key]
        public string Id { get; set; }
        public int IdEmpresa { get; set; }
        public int IdPessoa { get; set; }
        public int IdCupom { get; set; }
        public int IdVenda { get; set; }
        public decimal Valor { get; set; }
    }
}
