using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;
using ProjetoMarketing.Utilidades;

namespace ProjetoMarketing.Controllers
{
    [Produces("application/json")]
    [Route("api/Transacao")]
    public class TransacaoController : ControladorBase
    {
        private readonly UsuarioContext _contextUsuario;
        private readonly TransacaoContext _contextTransacao;
        private readonly PessoaEmpresaContext _contextPessoaEmpresa;


        public TransacaoController(
            UsuarioContext usuarioContext,
            TransacaoContext transacaoContext,
            PessoaEmpresaContext pessoaContext)
        {
            _contextUsuario = usuarioContext;
            _contextTransacao = transacaoContext;
            _contextPessoaEmpresa = pessoaContext;
        }

        [Authorize("Bearer")]
        [HttpPost("GereCupom")]
        public RetornoRequestModel GereCupom([FromBody]ParametrosGeracaoDeCupom parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var perfilDaEmpresa = _contextPessoaEmpresa.PerfilEmpresa.FirstOrDefault(p => p.IdEmpresa == parametros.IdEmpresa);

            var cupom = new Cupom();

            new TransacaoDAO(_contextTransacao).GereCupom(parametros, perfilDaEmpresa, out cupom);

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

            new TransacaoDAO(_contextTransacao).GereVendaComCupom(parametros, cupom, out venda);

            var retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoVenda(venda)
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCuponsEVendasEmpresa")]
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasEmpresa([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = new
                {
                    Cupons = Projecoes.ProjecaoCupons(await new TransacaoDAO(_contextTransacao).ObtenhaCuponsEmpresa(parametros.IdEmpresa)),
                    Vendas = Projecoes.ProjecaoVendas(await new TransacaoDAO(_contextTransacao).ObtenhaVendasEmpresa(parametros.IdEmpresa))
                }
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCuponsEVendasPessoa")]
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasPessoa([FromBody]ParametrosObtenhaDadosPessoa parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var retorno = new RetornoRequestModel
            {
                Result = new
                {
                    Cupons = Projecoes.ProjecaoCupons(await new TransacaoDAO(_contextTransacao).ObtenhaCuponsPessoa(parametros.IdPessoa)),
                    Vendas = Projecoes.ProjecaoVendas(await new TransacaoDAO(_contextTransacao).ObtenhaVendasPessoa(parametros.IdPessoa))
                }
            };

            return retorno;
        }
    }
}