using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Areas.Empresa.Persistencia;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Servicos;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Servicos
{
    public class EmpresaService
    {
        public static EmpresaService Instancia => new EmpresaService();

        public async Task CadastrePerfilEmpresa(CadastroPerfilModel model, PessoaEmpresaContext contexto)
        {
            try
            {
                PerfilEmpresa perfil = new PerfilEmpresa();
                await new EmpresaDAO(contexto).AddPerfilEmpresa(model, out perfil);
                new ImagemService(contexto).AtualizeImagensCatalogo(model.Catalogo, perfil.IdPerfilEmpresa);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public async Task AtualizePerfilEmpresa(CadastroPerfilModel model, PessoaEmpresaContext contexto)
        {
            try
            {
                await new EmpresaDAO(contexto).UpdatePerfil(model);
                new ImagemService(contexto).AtualizeImagensCatalogo(model.Catalogo, model.IdPerfilEmpresa);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
