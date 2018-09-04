using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        private readonly PessoaEmpresaContext _context;


        public TransacaoController(PessoaEmpresaContext pessoaContext)
        {
            _context = pessoaContext;
        }

        [Authorize("Bearer")]
        [HttpPost("GereCupomCompartilhamento")]
        public async Task<RetornoRequestModel> GereCupomCompartilhamento([FromBody] ParametrosCompartilhamento parametros)
        {
            var compartilhamento = new Compartilhamento();
            new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                var desconto = await new Areas.Empresa.Persistencia.EmpresaDAO(_context).SelectDesconto(parametros.IdEmpresa);

                var cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, desconto, out cupom, compartilhamento.IdCompartilhamento);

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
            var cupom = await new TransacaoDAO(_context).SelectCupom(parametros.TokenCupom);
            var venda = new Venda();

            await new TransacaoDAO(_context).GereVendaComCupom(parametros, cupom, out venda);

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
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasEmpresa([FromBody]ParametrosObtenhaDadosPessoaEmpresa parametros)
        {
            var retorno = new RetornoRequestModel
            {
                Result = new
                {
                    CuponsVendas = Projecoes.ProjecaoCupons(await new TransacaoDAO(_context).ObtenhaCuponsEVendasEmpresa(parametros.IdPerfilEmpresa)),
                }
            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCuponsEVendasPessoa")]
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasPessoa([FromBody]ParametrosObtenhaDadosPessoa parametros)
        {
            var retorno = new RetornoRequestModel
            {
                Result = new
                {
                    CuponsVendas = Projecoes.ProjecaoCupons(await new TransacaoDAO(_context).ObtenhaCuponsEVendasPessoa(parametros.IdPessoa)),
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
                Result = !await new TransacaoDAO(_context).PessoaPodeCompartilhar(parametros)
            };
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCupomPeloToken")]
        public async Task<RetornoRequestModel> ObtenhaCupomPeloToken([FromBody]ParametrosObtenhaCupom parametros)
        {
            if (parametros == null || parametros.CupomToken == null) return RetornoRequestModel.CrieFalha();

            try
            {
                var cupom = await new TransacaoDAO(_context).ObtenhaCupomPeloToken(parametros);

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
