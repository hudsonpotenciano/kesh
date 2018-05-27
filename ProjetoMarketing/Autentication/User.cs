using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Autentication
{
    public class User
    {
        public User(string login, string senha)
        {
            Login = login;
            Senha = senha;
        }

        public string Login { get; set; }
        public string Senha { get; set; }
    }
}
