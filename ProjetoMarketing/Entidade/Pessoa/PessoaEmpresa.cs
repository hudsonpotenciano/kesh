using System.ComponentModel.DataAnnotations;

namespace ProjetoMarketing.Entidade.Pessoa
{
    public class PessoaEmpresa
    {
        [Key]
        public string Id { get; set; }
        public int IdPessoa { get; set; }
        public int IdEmpresa { get; set; }
        public int Pontuacao { get; set; }
        public int Nota { get; set; }
        public string Comentario { get; set; }
    }
}
