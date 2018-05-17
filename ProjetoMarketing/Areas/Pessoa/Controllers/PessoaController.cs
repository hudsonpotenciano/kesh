using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Areas.Pessoa.Context;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Areas.Pessoa.Models;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Areas.Pessoa.Persistencia;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa")]
    public class PessoaController : ControladorBase
    {
        private readonly PessoaContext _context;
        private readonly UsuarioContext _contextUsuario;

        public PessoaController(PessoaContext context, UsuarioContext contextUsuario)
        {
            _context = context;
            _contextUsuario = contextUsuario;

        }

        [AllowAnonymous]
        [HttpPost]
        public RetornoRequestModel CadastrePessoa(Entidade.Pessoa.Pessoa pessoa, Entidade.Usuario usuario)
        {
            new PessoaDAO(_context).Add(pessoa);

            usuario.IdPessoa = pessoa.IdPessoa;

            new UsuarioDAO(_contextUsuario).Add(usuario);

            ///retornar dados 
            ///
            return RetornoRequestModel.CrieSucesso();
        }
    }
}