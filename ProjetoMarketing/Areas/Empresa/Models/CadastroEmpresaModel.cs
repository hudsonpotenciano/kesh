namespace ProjetoMarketing.Areas.Empresa.Models
{
    public class CadastroEmpresaModel
    {
        public string Email { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Telefone2 { get; set; }
        public string Senha { get; set; }
        public string Cnpj { get; set; }
        public byte[] Logo { get; set; }
        public string Resumo { get; set; }
        public int RecompensaCompartilhamento { get; set; }
        public int RecompensaPontos { get; set; }
        public int PontosPorReal { get; set; }
        public long Latitude { get; set; }
        public long Longitude { get; set; }
        public int[] Categorias { get; set; }
    }
}
