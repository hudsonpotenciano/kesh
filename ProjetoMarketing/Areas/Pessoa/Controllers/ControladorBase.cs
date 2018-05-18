using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Autentication.Context;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    public class ControladorBase : Controller
    {
        public bool EstaAutenticado(UsuarioContext _contextUsuario, string token)
        {
            return new UsuarioDAO(_contextUsuario).Validate(token);
        }
    }
}
