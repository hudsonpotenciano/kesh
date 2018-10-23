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

        public async Task<Cupom> GereCupomCompartilhamento(ParametrosCompartilhamento parametros,PessoaEmpresaContext _context)
        {
            var compartilhamento = new Compartilhamento();
            new TransacaoDAO(_context).GereCompartilhamento(parametros, out compartilhamento);

            if (compartilhamento.IdCompartilhamento != 0)
            {
                var cupom = new Cupom();
                await new TransacaoDAO(_context).GereCupom(parametros, out cupom, compartilhamento.IdCompartilhamento);
                var pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == cupom.IdPessoa);
                var pessoa = _context.Pessoa.Where(p => p.IdPessoa == compartilhamento.IdsPessoas);

                NotificacaoService.Instancia.EnvieNotificacaoDeCompartilhamento(pessoa.Nome,);
                return cupom;
            }

            return null; 
        }
    }
}
