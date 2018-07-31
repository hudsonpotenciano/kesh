using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class ParametrosAtualizeFoto : ParametrosRequestModel
    {
        public string Foto { get; set; }
        public int IdPessoa { get; set; }
    }
}
