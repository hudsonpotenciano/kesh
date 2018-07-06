using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Entidade
{
    public class PessoaEmpresa
    {
        public Entidade.Empresa.Empresa Empresa { get; set; }
        public int Pontuacao { get; set; }
        public int Nota { get; set; }
        public string Comentario { get; set; }
    }
}
