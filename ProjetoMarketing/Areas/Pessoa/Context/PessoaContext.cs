using Microsoft.EntityFrameworkCore;

namespace ProjetoMarketing.Areas.Pessoa.Context
{
    public class PessoaContext : DbContext
    {
        public PessoaContext(DbContextOptions<PessoaContext> options) : base(options) {}

        public DbSet<Entidade.Pessoa.Pessoa> Pessoa { get; set; }
        public DbSet<Entidade.Pessoa.PessoaEmpresa> PessoaEmpresa { get; set; }
        public DbSet<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }

    }
}
