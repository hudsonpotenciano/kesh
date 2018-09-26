using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;
using System.Threading.Tasks;

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
            Compartilhamento compartilhamento = new Compartilhamento();
            new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                decimal desconto = await new Areas.Empresa.Persistencia.EmpresaDAO(_context).SelectDesconto(parametros.IdEmpresa);

                Cupom cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, desconto, out cupom, compartilhamento.IdCompartilhamento);

                RetornoRequestModel retorno = new RetornoRequestModel()
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
            Cupom cupom = await new TransacaoDAO(_context).SelectCupom(parametros.TokenCupom);
            Venda venda = new Venda();

            await new TransacaoDAO(_context).GereVendaComCupom(parametros, cupom, out venda);

            if (venda.IdVenda != 0)
            {
                RetornoRequestModel retorno = new RetornoRequestModel
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
            RetornoRequestModel retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoCupons(await new TransacaoDAO(_context).ObtenhaCuponsEVendasEmpresa(parametros.IdPerfilEmpresa)),

            };

            return retorno;
        }


        [Authorize("Bearer")]
        [HttpPost("ObtenhaCuponsEVendasEmpresaAdmin")]
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasEmpresaAdmin([FromBody]ParametrosObtenhaDadosEmpresa parametros)
        {
            RetornoRequestModel retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoDTOVendasAdminLoja(await new TransacaoDAO(_context).ObtenhaCuponsEVendasEmpresaAdmin(parametros.IdEmpresa)),

            };

            return retorno;
        }

        [Authorize("Bearer")]
        [HttpPost("ObtenhaCuponsEVendasPessoa")]
        public async Task<RetornoRequestModel> ObtenhaCuponsEVendasPessoa([FromBody]ParametrosObtenhaDadosPessoa parametros)
        {
            RetornoRequestModel retorno = new RetornoRequestModel
            {
                Result = Projecoes.ProjecaoCupons(await new TransacaoDAO(_context).ObtenhaCuponsEVendasPessoa(parametros.IdPessoa)),
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
            if (parametros == null || parametros.CupomToken == null)
            {
                return RetornoRequestModel.CrieFalha();
            }

            try
            {
                DTO.DTOCupomParaVenda cupom = await new TransacaoDAO(_context).ObtenhaCupomPeloToken(parametros);

                if (cupom != null)
                {
                    return new RetornoRequestModel
                    {
                        Result = Projecoes.ProjecaoDtoCupomParaVenda(cupom)
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
