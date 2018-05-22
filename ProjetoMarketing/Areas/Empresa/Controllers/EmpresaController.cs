using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Context;
using ProjetoMarketing.Autentication.Context;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Controllers;

namespace ProjetoMarketing.Areas.Empresa.Controllers
{
    [Produces("application/json")]
    [Route("api/Empresa")]
    public class EmpresaController : ControladorBase
    {
        private readonly EmpresaContext _context;
        private readonly UsuarioContext _contextUsuario;

        public EmpresaController(EmpresaContext context, UsuarioContext usuarioContext)
        {
            _context = context;
            _contextUsuario = usuarioContext;
        }

        [AllowAnonymous]
        [HttpPost("CadastrePessoa")]
        public RetornoRequestModel CadastrePessoa(Entidade.Empresa.Empresa empresa, PerfilEmpresa perfil, Entidade.Usuario usuario)
        {
            if (_context.Empresa.Any(e => e.Cnpj == empresa.Cnpj || e.Email == empresa.Email)
                || _contextUsuario.Usuario.Any(u => u.Login == usuario.Login))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var empresaDAO = new EmpresaDAO(_context);
            empresaDAO.Add(empresa);
            perfil.IdEmpresa = empresa.IdEmpresa;
            empresaDAO.Add(perfil);

            usuario.IdEmpresa = empresa.IdEmpresa;

            new UsuarioDAO(_contextUsuario).Add(usuario);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoRetornoCadastroEmpresa(empresa, usuario, perfil)
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpGet("ObtenhaEmpresas")]
        public RetornoRequestModel ObtenhaEmpresas(ParametrosObtenhaEmpresas parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = new EmpresaDAO(_context).SelectEmpresas()
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpGet("ObtenhaEmpresas")]
        public RetornoRequestModel ObtenhaPerfilEmpresa(ParametrosObtenhaEmpresa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoPerfilEmpresa(_context.PerfilEmpresa.Where(e => e.IdEmpresa == parametros.IdEmpresa).FirstOrDefault())
            };

            return retorno;
        }
    }
}