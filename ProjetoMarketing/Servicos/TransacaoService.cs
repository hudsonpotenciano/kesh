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
            Compartilhamento compartilhamento = new Compartilhamento();
            new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                Cupom cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, out cupom, compartilhamento.IdCompartilhamento);
                var pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == cupom.IdPessoa);

                foreach (int idPessoa in compartilhamento.IdsPessoas)
                {
                    var pessoaCompartilhamento = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == idPessoa);
                    NotificacaoService.Instancia.EnvieNotificacaoDeCompartilhamento(pessoa.Nome, pessoaCompartilhamento.IdsNotificacao);
                }

                return cupom;
            }

            return null;
        }
    }
}
