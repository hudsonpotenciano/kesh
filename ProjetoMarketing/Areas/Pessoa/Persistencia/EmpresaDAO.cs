using ProjetoMarketing.Areas.Empresa.Context;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class EmpresaDAO
    {
        private readonly EmpresaContext _context;

        public EmpresaDAO(EmpresaContext context)
        {
            _context = context;
        }

        public void Add(Entidade.Empresa.Empresa empresa)
        {
            _context.Empresa.Add(empresa);
            _context.SaveChanges();
        }
        public void Add(Entidade.Empresa.PerfilEmpresa perfil)
        {
            _context.PerfilEmpresa.Add(perfil);
            _context.SaveChanges();
        }
    }
}
