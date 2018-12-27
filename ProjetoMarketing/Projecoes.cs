using ProjetoMarketing.Areas.Empresa.DTO;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Entidade.Pessoa;
using ProjetoMarketing.Negocio.Enumeradores;
using System.Collections.Generic;
using System.Linq;

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

        public static dynamic DadosEmpresaAdmin(DTODadosEmpresaAdmin dadosEmpresa)
        {
            return new
            {
                Empresa = ProjecaoEmpresa(dadosEmpresa.Empresa),
                PerfisEmpresaCatalogo = dadosEmpresa.PerfisEmpresaCatalogo.Any() ? ProjecaoPerfisEmpresa(dadosEmpresa.PerfisEmpresaCatalogo) : null,
                Conta = ProjecaoContaEmpresa(dadosEmpresa.ContaEmpresa)
            };
        }

        public static dynamic DadosEmpresaLoja(DTODadosEmpresaLoja dadosEmpresa)
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
                               imagem.GuidImagem
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

        public static dynamic PessoaLojas(List<DTO.DTOPessoaLoja> pessoaLojas)
        {
            return from pessoa in pessoaLojas
                   select new
                   {
                       pessoa.Loja,
                       pessoa.Pontos,
                       pessoa.NomeEmpresa,
                       pessoa.PontosEmDinheiro
                   };
        }

        public static dynamic PessoaEmpresas(List<DTO.DTOPessoa> pessoaEmpresas, Enumeradores.UnidadeMedidaLocalizacao unit)
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
                                      imagem.GuidImagem
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
                       item.NomePessoa,
                       item.IdPerfilEmpresa,
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

        public static dynamic ProjecaoCompartilhamento(Compartilhamento compartilhamento)
        {
            return new
            {
                compartilhamento.Data,
                compartilhamento.Codigo,
                compartilhamento.IdCompartilhamento,
            };
        }

        public static dynamic ProjecaoCupom(Cupom cupom)
        {
            return new
            {
                cupom.IdCupom,
                cupom.Token,
                cupom.Data,
                cupom.IdPerfilEmpresa,
                cupom.DataValidade,
                cupom.IdPessoa
            };
        }
        public static dynamic ProjecaoDTOVendasAdminLoja(List<DTO.DTOVendasAdminLoja> dtovendasLojas)
        {
            return from dto in dtovendasLojas
                   select new
                   {
                       dto.Venda,
                       dto.NomeLoja
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
                           dto.Cupom.DataValidade,
                           dto.Cupom.IdPessoa,
                       },
                       Venda = dto.Venda != null ? new
                       {
                           dto.Venda.IdCupom,
                           dto.Venda.IdPerfilEmpresa,
                           dto.Venda.IdPessoa,
                           dto.Venda.Valor,
                           dto.Venda.IdVenda,
                           dto.Venda.Data
                       } : null,
                       dto.DescricaoPerfilEmpresa,
                       dto.IdEmpresa,
                       dto.NomePessoa,
                       dto.NomeEmpresa,
                       dto.Pontos
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
                venda.Valor,
                venda.Data
            };
        }

        public static dynamic ProjecaoDtoCupomParaVenda(DTO.DTOCupomParaVenda dto)
        {
            return new
            {
                Cupom = new
                {
                    dto.Cupom.Data,
                    dto.Cupom.DataValidade,
                    dto.Cupom.IdCompartilhamento,
                    dto.Cupom.IdCupom,
                    dto.Cupom.IdPerfilEmpresa,
                    dto.Cupom.IdPessoa,
                    dto.Cupom.Token
                },
                dto.TotalDinheiroPessoa
            };
        }

        #region private
        private static dynamic ProjecaoContaEmpresa(ContaEmpresa conta)
        {
            return new
            {
                conta.IdEmpresa,
                conta.Categoria,
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

        private static dynamic ProjecaoPerfisEmpresa(IEnumerable<DTOPerfilEmpresaCatalogo> perfisCatalogo)
        {
            return from perfil in perfisCatalogo
                   select new
                   {
                       perfil.Perfil.IdEmpresa,
                       perfil.Perfil.IdPerfilEmpresa,
                       perfil.Perfil.Descricao,
                       perfil.Perfil.Latitude,
                       perfil.Perfil.Longitude,
                       perfil.Perfil.Telefone,
                       perfil.Perfil.Telefone2,
                       Catalogo = perfil.Catalogo.Select(a => new { a.GuidImagem, a.IdPerfilEmpresa })
                   };
        }

        private static dynamic ProjecaoPessoaEmpresa(PessoaEmpresa pessoaEmpresa)
        {
            return new
            {
                pessoaEmpresa.Comentario,
                pessoaEmpresa.IdPerfilEmpresa,
                pessoaEmpresa.IdPessoa,
                pessoaEmpresa.Nota
            };
        }
        #endregion
    }
}
