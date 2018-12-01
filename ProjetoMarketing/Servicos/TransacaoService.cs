using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Models;
using ProjetoMarketing.Persistencia;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Servicos
{
    public class TransacaoService
    {
        public static TransacaoService Instancia => new TransacaoService();

        public async Task<Cupom> GereCupomCompartilhamento(ParametrosCodigoCompartilhamento parametros, PessoaEmpresaContext _context)
        {
            if (string.IsNullOrEmpty(parametros.Codigo))
            {
                return null;
            }

            var compartilhamento = _context.Compartilhamento.FirstOrDefault(c => c.Codigo == parametros.Codigo);
            if (compartilhamento != null)
            {
                Cupom cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, out cupom, compartilhamento);

                NotificacaoService.Instancia.EnvieNotificacaoDeCompartilhamento(compartilhamento.IdPessoa, _context);
                return cupom;
            }
            else
            {
                return null;
            }
        }

        public async Task<Compartilhamento> GereCompartilhamento(ParametrosCompartilhamento parametros, PessoaEmpresaContext _context)
        {
            try
            {
                Compartilhamento compartilhamento = new Compartilhamento();
                await new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);
                return compartilhamento;
            }
            catch (System.Exception)
            {
                return null;
                throw;
            }
        }
    }
}
