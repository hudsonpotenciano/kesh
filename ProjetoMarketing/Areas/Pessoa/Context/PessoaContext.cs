using Microsoft.EntityFrameworkCore;

namespace ProjetoMarketing.Areas.Pessoa.Context
{
    public class PessoaContext : DbContext
    {
        public PessoaContext(DbContextOptions<PessoaContext> options) : base(options) {}

        public DbSet<Models.Pessoa> Pessoa { get; set; }
        public DbSet<Models.Usuario> Usuario { get; set; }
    }
}
