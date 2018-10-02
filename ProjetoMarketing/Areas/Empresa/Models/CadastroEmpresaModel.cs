using ProjetoMarketing.Entidade;

namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroEmpresaModel
    {
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Telefone { get; set; }
        public string Telefone2 { get; set; }
        public string Senha { get; set; }
        public string Cnpj { get; set; }
        public byte[] Logo { get; set; }
        public string Resumo { get; set; }
        public decimal ValorPontos { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int Categoria { get; set; }
    }
}
