using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Entidade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Contexts
{
    public class TransacaoContext : DbContext
    {
        public TransacaoContext(DbContextOptions<TransacaoContext> options) : base(options) { }
        public DbSet<Cupom> Cupom { get; set; }
        public DbSet<Compartilhamento> Compartilhamento { get; set; }
        public DbSet<Venda> Venda { get; set; }
    }
}
