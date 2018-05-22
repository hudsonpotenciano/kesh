using ProjetoMarketing.Areas.Empresa.Context;
using System.Collections.Generic;
using System.Linq;

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

        public dynamic SelectEmpresas()
        {
            return (from empresa in _context.Empresa
                    join perfil in _context.PerfilEmpresa on empresa.IdEmpresa equals perfil.IdEmpresa
                    select new
                    {
                        empresa.Email,
                        empresa.IdEmpresa,
                        empresa.Nome,
                        empresa.Telefone,
                        perfil.Latitude,
                        perfil.Longitude,
                        perfil.PontosPorReal,
                        perfil.RecompensaCompartilhamento,
                        perfil.RecompensaPontos,
                        perfil.Resumo,
                        perfil.Categorias
                    }).ToList();
        }
    }
}
