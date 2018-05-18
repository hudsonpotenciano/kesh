using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Context;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;

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
            if(_context.Pessoa.Any(p => p.CpfCnpj == pessoa.CpfCnpj || p.Email == pessoa.Email)
                || _contextUsuario.Usuario.Any(u => u.Login == usuario.Login))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            new PessoaDAO(_context).Add(pessoa);

            usuario.IdPessoa = pessoa.IdPessoa;

            new UsuarioDAO(_contextUsuario).Add(usuario);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoRetornoCadastroPessoa(pessoa, usuario)
            };

            return retorno;
        }
    }
}