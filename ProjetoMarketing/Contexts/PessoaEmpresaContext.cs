using System;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

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
        public DbSet<Entidade.Cupom> Cupom { get; set; }
        public DbSet<Entidade.Compartilhamento> Compartilhamento { get; set; }
        public DbSet<Entidade.Venda> Venda { get; set; }
        public DbSet<Entidade.Usuario> Usuario { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            return base.SaveChangesAsync(cancellationToken);
        }
        public override async Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            try
            {
                var saveChangesAsync = await base.SaveChangesAsync(acceptAllChangesOnSuccess,cancellationToken);
                Database.CommitTransaction();
                return saveChangesAsync;
            }
            catch (System.Data.DBConcurrencyException e)
            {
                var a = e.Message;
                Database.RollbackTransaction();
            }
            catch (Exception e)
            {
                var a = e.Message;
                Database.RollbackTransaction();
            }

            return 0;
        }
    }
}
