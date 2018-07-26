using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroContaModel : ParametrosRequestModel
    {
        public int IdEmpresa { get; set; }
        public string Resumo { get; set; }
        public decimal DescontoCompartilhamento { get; set; }
        public decimal ValorPontos { get; set; }
        public int[] Categorias { get; set; }
        public byte[] Logo { get; set; }
    }
}
