using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Context;
using ProjetoMarketing.Areas.Pessoa.Context;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;
using ProjetoMarketing.Utilidades;

namespace ProjetoMarketing.Controllers
{
    [Produces("application/json")]
    [Route("api/Cupom")]
    public class TransacaoController : ControladorBase
    {
        private readonly UsuarioContext _contextUsuario;
        private readonly TransacaoContext _contextTransacao;
        private readonly EmpresaContext _contextEmpresa;
        private readonly PessoaContext _contextPessoa;


        public TransacaoController(
            UsuarioContext usuarioContext,
            TransacaoContext transacaoContext,
            EmpresaContext empresaContext,
            PessoaContext pessoaContext)
        {
            _contextUsuario = usuarioContext;
            _contextTransacao = transacaoContext;
            _contextEmpresa = empresaContext;
            _contextPessoa = pessoaContext;
        }

        [Authorize("Bearer")]
        [HttpPost("GereCupom")]
        public RetornoRequestModel GereCupom([FromBody]ParametrosGeracaoDeCupom parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var perfilDaEmpresa = _contextEmpresa.PerfilEmpresa.FirstOrDefault(p => p.IdEmpresa == parametros.IdEmpresa);

            var cupom = new Cupom();

            new TransacaoDAO(_contextTransacao).GereCupom(parametros, perfilDaEmpresa, out cupom);

            var qrCode = new QrCode().GereQrCode(cupom.Token.ToString());

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoCupom(cupom)
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("GereVendaComCupom")]
        public RetornoRequestModel GereVendaComCupom([FromBody]ParametrosCupomVenda parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var cupom = _contextTransacao.Cupom.FirstOrDefault(p => p.Token.Equals(parametros.TokenCupom));
            var venda = new Venda();

            new TransacaoDAO(_contextTransacao).GereVendaComCupom(parametros,cupom,out venda);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoVenda(venda)
            };

            return retorno;
        }
    }
}