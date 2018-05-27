using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    public class LoginController : ControladorBase
    {
        private readonly UsuarioContext _context;

        public LoginController(UsuarioContext context)
        {
            _context = context;
        }

    }
}
