using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Autentication.Context;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    public class ControladorBase : Controller
    {
        //private readonly UsuarioContext _usuarioContext;

        //public ControladorBase(UsuarioContext usuarioContext)
        //{
        //    _usuarioContext = usuarioContext;
        //}

        //public bool EstaAutenticado(string token)
        //{
        //    return new UsuarioDAO(_usuarioContext).Validate(token);
        //}
    }
}
