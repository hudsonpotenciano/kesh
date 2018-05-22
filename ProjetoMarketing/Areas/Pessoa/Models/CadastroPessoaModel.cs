using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class CadastroPessoaModel
    {
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Senha { get; set; }
        public string CpfCnpj { get; set; }
        public string Foto { get; set; }
    }
}
