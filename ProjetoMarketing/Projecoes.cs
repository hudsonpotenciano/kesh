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
        public static dynamic ProjecaoRetornoLogin(Usuario usuario, string token)
        {
            return new
            {
                usuario.Token,
                usuario.IdPessoa,
                usuario.IdEmpresa,
                AccessToken = token
            };
        }

        public static dynamic ProjecaoRetornoCadastroUsuarioEmpresa(Usuario usuario, string token)
        {
            return new
            {
                usuario.Token,
                usuario.IdEmpresa,
                AccessToken = token
            };
        }

        public static dynamic ProjecaoRetornoCadastroPessoaUsuario(Usuario usuario, string token)
        {
            return new
            {
                usuario.Token,
                usuario.IdPessoa,
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
                       item.IdEmpresa,
                       item.Telefone2
                   };
        }

        public static dynamic ProjecaoPerfilEmpresa(PerfilEmpresa perfil)
        {
            return new
            {
                perfil.IdEmpresa,
                perfil.Latitude,
                perfil.Longitude,
                perfil.DescontoCompartilhamento,
                perfil.ValorPontos,
                perfil.Resumo,
                perfil.Categorias
            };
        }

        public static dynamic ProjecaoCupom(Cupom cupom)
        {
            return new
            {
                cupom.Desconto,
                cupom.IdCupom,
                cupom.Token,
                cupom.Validade,
                cupom.IdEmpresa,
                cupom.IdPessoa
            };
        }
        public static dynamic ProjecaoVenda(Venda venda)
        {
            return new
            {
                venda.IdCupom,
                venda.IdVenda,
                venda.IdPessoa,
                venda.IdEmpresa,
                venda.Valor
            };
        }
    }
}
