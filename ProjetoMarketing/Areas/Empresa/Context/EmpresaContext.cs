using Microsoft.EntityFrameworkCore;

namespace ProjetoMarketing.Areas.Empresa.Context
{
    public class EmpresaContext : DbContext
    {
        public EmpresaContext(DbContextOptions<EmpresaContext> options) : base(options) {}
        public DbSet<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }
        public DbSet<Entidade.Empresa.ImagensEmpresa> ImagensEmpresa { get; set; }
    }
}
