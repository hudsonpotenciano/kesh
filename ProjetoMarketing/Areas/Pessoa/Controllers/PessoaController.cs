using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Pessoa.Context;
using Microsoft.AspNetCore.Authorization;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Areas.Pessoa.Persistencia;
using ProjetoMarketing.Models;
using ProjetoMarketing.Controllers;
using ProjetoMarketing.Areas.Pessoa.Models;
using System;
using ProjetoMarketing.Autentication;
using ProjetoMarketing.Data;

namespace ProjetoMarketing.Areas.Pessoa.Controllers
{
    [Produces("application/json")]
    [Route("api/Pessoa/Pessoa")]
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
        [HttpPost("CadastrePessoa")]
        public RetornoRequestModel CadastrePessoa([FromBody] CadastroPessoaModel model,
                                                [FromServices]SigningConfigurations signingConfigurations,
                                                [FromServices]TokenConfigurations tokenConfigurations)
        {
            if (_context.Pessoa.Any(p => p.CpfCnpj == model.CpfCnpj || p.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var pessoa = new PessoaDAO(_context).Add(model);

            var usuario = new Entidade.Usuario()
            {
                IdPessoa = pessoa.IdPessoa,
                Login = model.Email,
                Senha = model.Senha
            };

            new UsuarioDAO(_contextUsuario).Add(usuario);

            var user = new User(usuario.Login, usuario.Senha);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoRetornoCadastroUsuario(usuario, GenerateAcessToken(user, signingConfigurations, tokenConfigurations))
            };

            return retorno;
        }

        [AllowAnonymous]
        [HttpGet("ObtenhaFotoPessoa")]
        public ActionResult ObtenhaFotoPessoa(int idPessoa)
        {
            var foto = _context.PerfilPessoa.First(p => p.IdPessoa.Equals(idPessoa))?.Foto;

            if (foto == null) return null;

            return File(foto, "image/jpeg");
        }
    }
}