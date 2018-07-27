using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Autentication.Context;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;

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
        [HttpPost("GereCupomCompartilhamento")]
        public async Task<RetornoRequestModel> GereCupomCompartilhamento([FromBody] ParametrosCompartilhamento parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var compartilhamento = new Compartilhamento();
            new TransacaoDAO(_contextTransacao).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                var desconto = await new Areas.Empresa.Persistencia.EmpresaDAO(_contextPessoaEmpresa).SelectDesconto(parametros.IdEmpresa);

                var cupom = new Cupom();
                await new TransacaoDAO(_contextTransacao).GereCupom(parametros, desconto, out cupom, compartilhamento.IdCompartilhamento);

                var retorno = new RetornoRequestModel()
                {
                    Result = Projecoes.ProjecaoCupom(cupom)
                };

                return retorno;
            }

            return RetornoRequestModel.CrieFalha();
        }

        [Authorize("Bearer")]
        [HttpPost("GereVendaComCupom")]
        public async Task<RetornoRequestModel> GereVendaComCupom([FromBody]ParametrosCupomVenda parametros)
        {
            if (!EstaAutenticado(_contextUsuario, parametros.Token))
                return RetornoRequestModel.CrieFalhaLogin();

            var cupom = await new TransacaoDAO(_contextTransacao).SelectCupom(parametros.TokenCupom);
            var venda = new Venda();

            await new TransacaoDAO(_contextTransacao).GereVendaComCupom(parametros, cupom, out venda);

            if (venda.IdVenda != 0)
            {
                var retorno = new RetornoRequestModel
                {
                    Result = Projecoes.ProjecaoVenda(venda)
                };

                return retorno;
            }

            return RetornoRequestModel.CrieFalha();
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
                    Cupons = Projecoes.ProjecaoCupons(await new TransacaoDAO(_contextTransacao).ObtenhaCuponsEmpresa(parametros.IdPerfilEmpresa)),
                    Vendas = Projecoes.ProjecaoVendas(await new TransacaoDAO(_contextTransacao).ObtenhaVendasEmpresa(parametros.IdPerfilEmpresa))
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

        [Authorize("Bearer")]
        [HttpPost("PessoaPodeCompartilhar")]
        public async Task<RetornoRequestModel> PessoaPodeCompartilhar([FromBody]ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            return new RetornoRequestModel
            {
                Result = !await new TransacaoDAO(_contextTransacao).PessoaPodeCompartilhar(parametros)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCupomPeloToken")]
        public async Task<RetornoRequestModel> ObtenhaCupomPeloToken([FromBody]ParametrosObtenhaCupom parametros)
        {
            if (parametros == null || parametros.CupomToken == null) return RetornoRequestModel.CrieFalha();

            try
            {
                var cupom = await new TransacaoDAO(_contextTransacao).ObtenhaCupomPeloToken(parametros);

                if (cupom != null)
                {
                    return new RetornoRequestModel
                    {
                        Result = cupom
                    };
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }

            return RetornoRequestModel.CrieFalha();
        }
    }
}
