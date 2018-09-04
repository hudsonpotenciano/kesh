using ProjetoMarketing.Areas.Empresa;
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
        public static dynamic DadosPessoa(Pessoa pessoa)
        {
            return new
            {
                pessoa.Email,
                pessoa.IdPessoa,
                pessoa.Nome
            };
        }

        public static dynamic DadosEmpresaAdmin(Areas.Empresa.DTO.DTODadosEmpresaAdmin dadosEmpresa)
        {
            return new
            {
                Empresa = ProjecaoEmpresa(dadosEmpresa.Empresa),
                PerfisEmpresa = dadosEmpresa.PerfisEmpresa.Any() ? ProjecaoPerfisEmpresa(dadosEmpresa.PerfisEmpresa) : null,
                Conta = ProjecaoContaEmpresa(dadosEmpresa.ContaEmpresa)
            };
        }

        public static dynamic DadosEmpresaLoja(Areas.Empresa.DTO.DTODadosEmpresaLoja dadosEmpresa)
        {
            return new
            {
                Empresa = ProjecaoEmpresa(dadosEmpresa.Empresa),
                Perfil = dadosEmpresa.PerfilEmpresa != null ? ProjecaoPerfilEmpresa(dadosEmpresa.PerfilEmpresa) : new PerfilEmpresa(),
                Conta = ProjecaoContaEmpresa(dadosEmpresa.ContaEmpresa),
                Catalogo = from imagem in dadosEmpresa.ImagensCatalogo
                           select new
                           {
                               imagem.IdPerfilEmpresa,
                               imagem.IdImagem
                           }
            };
        }

        public static dynamic ProjecaoPerfisEmpresaParcial(IEnumerable<PerfilEmpresa> perfis)
        {
            return from perfil in perfis
                   select new
                   {
                       perfil.IdEmpresa,
                       perfil.IdPerfilEmpresa,
                       perfil.Descricao
                   };
        }

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

        public static dynamic PessoasCompartilhamento(List<Pessoa> pessoas)
        {
            return from pessoa in pessoas
                   select new
                   {
                       pessoa.IdPessoa,
                       pessoa.Nome
                   };
        }

        public static dynamic PessoaEmpresas(List<DTO.DTOPessoa> pessoaEmpresas)
        {
            return from item in pessoaEmpresas
                   select new
                   {
                       Empresa = ProjecaoEmpresa(item.Empresa),
                       Perfil = ProjecaoPerfilEmpresa(item.PerfilEmpresa),
                       Conta = ProjecaoContaEmpresa(item.ContaEmpresa),
                       PessoaEmpresa = item.PessoaEmpresa != null ? ProjecaoPessoaEmpresa(item.PessoaEmpresa) : new PessoaEmpresa(),
                       item.NotaGeral,
                       item.Distancia,
                       Catalogo = from imagem in item.Catalogo
                                  select new
                                  {
                                      imagem.IdPerfilEmpresa,
                                      imagem.IdImagem
                                  }
                   };
        }

        public static dynamic NotasEComentariosPessoasEmpresas(List<DTO.DTONotasComentariosPessoasEmpresas> pessoaEmpresas)
        {
            return from item in pessoaEmpresas
                   select new
                   {
                       item.Comentario,
                       item.Nota,
                       item.Nome,
                       item.IdPessoa,
                       item.DataAvaliacao
                   };
        }


        public static dynamic ProjecaoEmpresa(Empresa empresa)
        {
            return new
            {
                empresa.Nome,
                empresa.Email,
                empresa.IdEmpresa
            };
        }

        public static dynamic ProjecaoCupom(Cupom cupom)
        {
            return new
            {
                cupom.Desconto,
                cupom.IdCupom,
                cupom.Token,
                cupom.Data,
                cupom.IdPerfilEmpresa,
                cupom.IdPessoa
            };
        }

        public static dynamic ProjecaoCupons(List<DTO.DTOCupomVenda> cupons)
        {
            return from dto in cupons
                   select new
                   {
                       Cupom = new
                       {
                           dto.Cupom.IdCupom,
                           dto.Cupom.Token,
                           dto.Cupom.Data,
                           dto.Cupom.IdPerfilEmpresa,
                           dto.Cupom.IdPessoa,
                           dto.Cupom.Desconto
                       },
                       Venda = dto.Venda != null ? new
                       {
                           dto.Venda.IdCupom,
                           dto.Venda.IdPerfilEmpresa,
                           dto.Venda.IdPessoa,
                           dto.Venda.Valor,
                           dto.Venda.IdVenda,
                       } : null,
                       dto.NomeEmpresa
                   };
        }

        public static dynamic ProjecaoVenda(Venda venda)
        {
            return new
            {
                venda.IdCupom,
                venda.IdVenda,
                venda.IdPessoa,
                venda.IdPerfilEmpresa,
                venda.Valor
            };
        }

        #region private
        private static dynamic ProjecaoContaEmpresa(ContaEmpresa conta)
        {
            return new
            {
                conta.IdEmpresa,
                conta.Categoria,
                conta.DescontoCompartilhamento,
                conta.Resumo,
                conta.ValorPontos,
            };
        }

        private static dynamic ProjecaoPerfilEmpresa(PerfilEmpresa perfil)
        {
            return new
            {
                perfil.IdEmpresa,
                perfil.IdPerfilEmpresa,
                perfil.Descricao,
                perfil.Latitude,
                perfil.Longitude,
                perfil.Telefone,
                perfil.Telefone2
            };
        }

        private static dynamic ProjecaoPerfisEmpresa(IEnumerable<PerfilEmpresa> perfis)
        {
            return from perfil in perfis
                   select new
                   {
                       perfil.IdEmpresa,
                       perfil.IdPerfilEmpresa,
                       perfil.Descricao,
                       perfil.Latitude,
                       perfil.Longitude,
                       perfil.Telefone,
                       perfil.Telefone2
                   };
        }

        private static dynamic ProjecaoPessoaEmpresa(PessoaEmpresa pessoaEmpresa)
        {
            return new
            {
                pessoaEmpresa.Comentario,
                pessoaEmpresa.IdPerfilEmpresa,
                pessoaEmpresa.IdPessoa,
                pessoaEmpresa.Nota,
                pessoaEmpresa.Pontuacao
            };
        }
        #endregion
    }
}
