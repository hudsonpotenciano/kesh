using ProjetoMarketing.Entidade.Empresa;

namespace ProjetoMarketing.DTO
{
    public class DTOPessoaEmpresa
    {
        public Empresa Empresa { get; set; }
        public int? Pontuacao { get; set; }
        public decimal? NotaGeral { get; set; }
        public decimal? Nota { get; set; }
        public string Comentario { get; set; }
    }
}
