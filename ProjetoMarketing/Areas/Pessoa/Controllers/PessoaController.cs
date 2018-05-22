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
        public RetornoRequestModel CadastrePessoa([FromBody] CadastroPessoaModel model)
        {
            if (_context.Pessoa.Any(p => p.CpfCnpj == model.CpfCnpj || p.Email == model.Email))
            {
                return RetornoRequestModel.CrieFalhaDuplicidade();
            }

            var pessoaDAO = new PessoaDAO(_context);

            // CRIAR TUDO ISSO DENTRO DO PESSOADAO COMO TRANSACAO
            var pessoa = new Entidade.Pessoa.Pessoa()
            {
                CpfCnpj = model.CpfCnpj,
                Email = model.CpfCnpj,
                Nome = model.Nome,
                Telefone = model.Telefone
            };

            pessoaDAO.Add(pessoa);

            var perfil = new Entidade.Pessoa.PerfilPessoa()
            {
                Foto = Convert.FromBase64String(model.Foto),
                IdPessoa = pessoa.IdPessoa
            };

            pessoaDAO.AddPerfil(perfil);

            var usuario = new Entidade.Usuario()
            {
                IdPessoa = pessoa.IdPessoa,
                Login = model.Email,
                Senha = model.Senha
            };

            new UsuarioDAO(_contextUsuario).Add(usuario);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoRetornoCadastroPessoa(pessoa, usuario)
            };

            return retorno;
        }
    }
}