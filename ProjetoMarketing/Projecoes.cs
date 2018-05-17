using ProjetoMarketing.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing
{
    public class Projecoes
    {
        public static dynamic ProjecaoRetornoLogin(Usuario usuario)
        {
            return
                new
                {
                    usuario.Token,
                    usuario.IdPessoa,
                    usuario.IdEmpresa
                };
        }
    }
}
