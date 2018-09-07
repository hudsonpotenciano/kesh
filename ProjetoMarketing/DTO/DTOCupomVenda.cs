using ProjetoMarketing.Entidade;

namespace ProjetoMarketing.DTO
{
    public class DTOCupomVenda
    {
        public Cupom Cupom { get; set; }
        public Venda Venda { get; set; }
        public string NomeEmpresa { get; set; }
        public string NomePessoa { get; set; }
        public decimal Pontos { get; set; }
    }
}
