using ProjetoMarketing.Negocio.Empresa;

namespace ProjetoMarketing.Entidade.Empresa
{
    public class PerfilEmpresa
    {
        public string Id { get; set; }
        public int IdEmpresa { get; set; }
        public string Resumo { get; set; }
        public int RecompensaCompartilhamento { get; set; }
        public int RecompensaPontos { get; set; }
        public int PontosPorReal { get; set; }
        public long Latitude { get; set; }
        public long Longitude { get; set; }
        public int[] Categorias { get; set; }
    }
}
