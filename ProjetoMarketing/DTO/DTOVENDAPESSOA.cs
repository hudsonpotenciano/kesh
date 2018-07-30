namespace ProjetoMarketing.DTO
{
    public class DTOVendaPessoa  
    {
        public string Nome { get; set; }
        public int IdVenda { get; set; }
        public int IdPessoa { get; set; }
        public decimal Valor { get; set; }
        public long IdCupom { get; set; }
        public long IdPerfilEmpresa { get; set; }
    }
}
