using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Autentication
{
    public class SocialUser
    {
        public string Email { get; set; }
        public string Id { get; set; }

        public SocialUser(string email, string id)
        {
            Email = email;
            Id = id;
        }

    }
}
