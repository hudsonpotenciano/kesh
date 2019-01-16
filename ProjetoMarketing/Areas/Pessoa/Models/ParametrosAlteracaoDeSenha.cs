using ProjetoMarketing.Models;

namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class ParametrosAlteracaoDeSenha : ParametrosRequestModel
    {
        public string NovaSenha { get; set; }
    }
}
