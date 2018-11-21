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

        public async Task<Cupom> GereCupomCompartilhamento(ParametrosCompartilhamento parametros, PessoaEmpresaContext _context)
        {
            if (parametros.IdsPessoas == null || parametros.IdsPessoas.Count() == 0)
                return null;

            Compartilhamento compartilhamento = new Compartilhamento();
            new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                Cupom cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, out cupom, compartilhamento.IdCompartilhamento);
                Entidade.Pessoa.Pessoa pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == cupom.IdPessoa);

                foreach (int idPessoa in compartilhamento.IdsPessoas)
                {
                    Entidade.Pessoa.Pessoa pessoaCompartilhamento = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == idPessoa);

                    if (pessoaCompartilhamento != null && 
                        pessoaCompartilhamento.IdsNotificacao != null &&
                        pessoaCompartilhamento.IdsNotificacao.Count > 0)
                    {
                        NotificacaoService.Instancia.EnvieNotificacaoDeCompartilhamento(pessoa.Nome, pessoaCompartilhamento.IdsNotificacao);
                    }
                }

                return cupom;
            }

            return null;
        }
    }
}
