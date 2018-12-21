using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Areas.Empresa.Persistencia;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Models;
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
                new EmpresaDAO(contexto).AddPerfilEmpresa(model, out perfil);
                await new ImagemService(contexto).AtualizeImagensCatalogo(model.Catalogo, perfil.IdPerfilEmpresa);
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }

        public async Task<RetornoRequestModel> AtualizePerfilEmpresa(CadastroPerfilModel model, PessoaEmpresaContext contexto)
        {
            if (model == null || model.IdPerfilEmpresa == 0)
            {
                return RetornoRequestModel.CrieFalha();
            }

            try
            {
                new EmpresaDAO(contexto).UpdatePerfil(model);
                await new ImagemService(contexto).AtualizeImagensCatalogo(model.Catalogo, model.IdPerfilEmpresa);
                return RetornoRequestModel.CrieSucesso();
            }
            catch (System.Exception e)
            {
                throw e;
            }
        }
    }
}
