using Microsoft.EntityFrameworkCore;

namespace ProjetoMarketing.Contexts
{
    public class PessoaEmpresaContext : DbContext
    {
        public PessoaEmpresaContext(DbContextOptions<PessoaEmpresaContext> options) : base(options) {}

        public DbSet<Entidade.Pessoa.Pessoa> Pessoa { get; set; }
        public DbSet<Entidade.Pessoa.PessoaEmpresa> PessoaEmpresa { get; set; }
        public DbSet<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }
        public DbSet<Entidade.Empresa.ContaEmpresa> ContaEmpresa { get; set; }
        public DbSet<Entidade.Empresa.Empresa> Empresa { get; set; }
        public DbSet<Entidade.Empresa.ImagemCatalogo> ImagemCatalogo { get; set; }
        public DbSet<Entidade.ImagemPerfil> ImagemPerfil { get; set; }

    }
}
