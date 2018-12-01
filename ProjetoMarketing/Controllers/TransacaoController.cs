using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;
using ProjetoMarketing.Servicos;
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
        public async Task<RetornoRequestModel> GereCupomCompartilhamento([FromBody] ParametrosCodigoCompartilhamento parametros)
        {
            try
            {
                Cupom cupom = await TransacaoService.Instancia.GereCupomCompartilhamento(parametros, _context);

                if (cupom != null)
                {
                    RetornoRequestModel retorno = new RetornoRequestModel()
                    {
                        Result = Projecoes.ProjecaoCupom(cupom)
                    };

                    return retorno;
                }

                return RetornoRequestModel.CrieFalha();
            }
            catch (System.Exception e)
            {
                return RetornoRequestModel.CrieFalha();
            }
        }

        [Authorize("Bearer")]
        [HttpPost("GereCompartilhamento")]
        public async Task<RetornoRequestModel> GereCompartilhamento([FromBody] ParametrosCompartilhamento parametros)
        {
            try
            {
                Compartilhamento compartilhamento = await TransacaoService.Instancia.GereCompartilhamento(parametros, _context);

                if (compartilhamento != null)
                {
                    RetornoRequestModel retorno = new RetornoRequestModel()
                    {
                        Result = Projecoes.ProjecaoCompartilhamento(compartilhamento)
                    };

                    return retorno;
                }

                return RetornoRequestModel.CrieFalha();
            }
            catch (System.Exception e)
            {
                return RetornoRequestModel.CrieFalha();
            }
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
