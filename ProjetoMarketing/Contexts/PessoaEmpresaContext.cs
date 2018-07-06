using Microsoft.EntityFrameworkCore;

namespace ProjetoMarketing.Contexts
{
    public class PessoaEmpresaContext : DbContext
    {
        public PessoaEmpresaContext(DbContextOptions<PessoaEmpresaContext> options) : base(options) {}

        public DbSet<Entidade.Pessoa.Pessoa> Pessoa { get; set; }
        public DbSet<Entidade.Pessoa.PessoaEmpresa> PessoaEmpresa { get; set; }
        public DbSet<Entidade.Pessoa.PerfilPessoa> PerfilPessoa { get; set; }
        public DbSet<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }
        public DbSet<Entidade.Empresa.ImagensEmpresa> ImagensEmpresa { get; set; }
        public DbSet<Entidade.Empresa.Empresa> Empresa { get; set; }

    }
}
