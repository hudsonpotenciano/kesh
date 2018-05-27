using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Entidade.Pessoa;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing
{
    public class Projecoes
    {
        public static dynamic ProjecaoRetornoLogin(Usuario usuario,string token)
        {
            return new
            {
                usuario.Token,
                usuario.IdPessoa,
                usuario.IdEmpresa,
                AccessToken = token
            };
        }

        public static dynamic ProjecaoRetornoCadastroUsuario(Usuario usuario, string token)
        {
            return new
            {
                usuario.Token,
                usuario.IdPessoa,
                usuario.IdEmpresa,
                AccessToken = token
            };
        }

        //public static dynamic ProjecaoRetornoCadastroEmpresa(Empresa empresa, Usuario usuario, PerfilEmpresa perfil)
        //{
        //    return new
        //    {
        //        empresa.Cnpj,
        //        empresa.Email,
        //        empresa.IdEmpresa,
        //        empresa.Telefone,
        //        empresa.Nome,
        //        usuario.Login,
        //        usuario.Senha,
        //        usuario.Token,
        //        perfil.Latitude,
        //        perfil.Longitude,
        //        perfil.PontosPorReal,
        //        perfil.RecompensaCompartilhamento,
        //        perfil.RecompensaPontos,
        //        perfil.Resumo,
        //        perfil.Categorias
        //    };
        //}

        public static dynamic ProjecaoEmpresas(List<Empresa> empresa)
        {
            return from item in empresa
                   select new
                   {
                       item.Nome,
                       item.Email,
                       item.Telefone,
                       item.IdEmpresa
                   };
        }

        public static dynamic ProjecaoPerfilEmpresa(PerfilEmpresa perfil)
        {
            return new
            {
                perfil.IdEmpresa,
                perfil.Latitude,
                perfil.Longitude,
                perfil.PontosPorReal,
                perfil.RecompensaCompartilhamento,
                perfil.RecompensaPontos,
                perfil.Resumo,
                perfil.Categorias
            };
        }
    }
}
