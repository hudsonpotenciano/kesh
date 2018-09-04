using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Entidade.Pessoa;
using System.Collections.Generic;

namespace ProjetoMarketing.DTO
{
    public class DTOPessoa
    {
        public Empresa Empresa { get; set; }
        public PerfilEmpresa PerfilEmpresa { get; set; }
        public ContaEmpresa ContaEmpresa { get; set; }
        public IEnumerable<ImagemCatalogo> Catalogo { get; set; }
        public PessoaEmpresa PessoaEmpresa { get; set; }
        public int Distancia { get; set; }
        public decimal? NotaGeral { get; set; }
    }
}
