using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Entidade.Empresa;

namespace ProjetoMarketing.Areas.Empresa.Context
{
    public class EmpresaContext : DbContext
    {
        public EmpresaContext(DbContextOptions<EmpresaContext> options) : base(options) {}
        public DbSet<PerfilEmpresa> PerfilEmpresa { get; set; }
        public DbSet<ImagensEmpresa> ImagensEmpresa { get; set; }
        public DbSet<Entidade.Empresa.Empresa> Empresa { get; set; }
    }
}
