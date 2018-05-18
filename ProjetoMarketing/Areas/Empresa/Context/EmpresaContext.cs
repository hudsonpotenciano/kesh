using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Entidade.Empresa;

namespace ProjetoMarketing.Areas.Empresa.Context
{
    public class EmpresaContext : DbContext
    {
        public EmpresaContext(DbContextOptions<EmpresaContext> options) : base(options) {}
        public DbSet<Entidade.Empresa.PerfilEmpresa> PerfilEmpresa { get; set; }
        public DbSet<Entidade.Empresa.ImagensEmpresa> ImagensEmpresa { get; set; }
        public DbSet<ProjetoMarketing.Entidade.Empresa.Empresa> Empresa { get; set; }
    }
}
