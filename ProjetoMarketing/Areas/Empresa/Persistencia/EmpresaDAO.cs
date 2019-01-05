using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Areas.Empresa.DTO;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Servicos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class EmpresaDAO
    {
        private readonly PessoaEmpresaContext _context;

        public EmpresaDAO(PessoaEmpresaContext context)
        {
            _context = context;
            if (_context.Database.CurrentTransaction != null)
            {
                _context.Database.CurrentTransaction.Commit();
            }

            _context.Database.BeginTransaction();
        }

        public Task AddIdNotificacao(Guid? idPerfilEmpresa, string tokenNotificacao)
        {
            if (!idPerfilEmpresa.HasValue)
            {
                return null;
            }

            return Task.Factory.StartNew(() =>
            {
                PerfilEmpresa perfilEmpresa = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa.Equals(idPerfilEmpresa));
                if (!perfilEmpresa.IdsNotificacao.ToList().Any(n => n == tokenNotificacao))
                {
                    perfilEmpresa.IdsNotificacao.ToList().Add(tokenNotificacao);
                    _context.PerfilEmpresa.Update(perfilEmpresa);
                }

                _context.SaveChangesAsync();
            });
        }

        public Task<int> AddEmpresaUsuario(CadastroEmpresaModel model, out Entidade.Empresa.Empresa empresa,
                                     out Entidade.Usuario usuario, out PerfilEmpresa perfil, out ImagemPerfil imagemPerfilEmpresa)
        {
            empresa = new Entidade.Empresa.Empresa()
            {
                Cnpj = model.Cnpj,
                Email = model.Email,
                Nome = model.Nome,
                IdEmpresa = Guid.NewGuid()
            };

            ContaEmpresa conta = new ContaEmpresa()
            {
                ValorPontos = model.ValorPontos,
                Resumo = model.Resumo,
                Categoria = model.Categoria,
                IdEmpresa = empresa.IdEmpresa,
                IdConta = Guid.NewGuid()
            };

            imagemPerfilEmpresa = new Entidade.ImagemPerfil()
            {
                IdEmpresa = empresa.IdEmpresa,
                Imagem = model.Logo,
            };

            perfil = new PerfilEmpresa()
            {
                IdEmpresa = empresa.IdEmpresa,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Descricao = model.Descricao,
                Telefone = model.Telefone,
                Telefone2 = model.Telefone2,
                IdPerfilEmpresa = Guid.NewGuid()
            };

            usuario = new Entidade.Usuario()
            {
                IdEmpresa = empresa.IdEmpresa,
                Login = model.Email,
                Token = Autentication.Seguranca.GerarHashMd5(model.Email, model.Senha),
                TokenEmpresaAdmin = Autentication.Seguranca.GerarHashMd5(model.Email, model.SenhaAdmin),
                IdUsuario = Guid.NewGuid()
            };

            Adesao adesao = new Adesao()
            {
                IdEmpresa = empresa.IdEmpresa,
                Disponivel = true,
                IdAdesao = Guid.NewGuid(),
                LimiteDeVendas = Negocio.Adesao.LimiteInicialDeVendas,
                UltimaAtualizacao = DateTime.Now
            };

            try
            {
                _context.Empresa.Add(empresa);
                _context.SaveChanges();

                _context.Adesao.Add(adesao);
                _context.ContaEmpresa.Add(conta);
                _context.ContaEmpresa.Add(conta);
                _context.PerfilEmpresa.Add(perfil);
                _context.Usuario.Add(usuario);
                return _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                _context.Remove(empresa);
                _context.Database.RollbackTransaction();
                throw e;
            }
        }

        public void UpdatePerfil(CadastroPerfilModel model, bool executarSaveChanges = false)
        {
            PerfilEmpresa perfil = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa == model.IdPerfilEmpresa);
            perfil.Latitude = model.Latitude != 0 ? model.Latitude : perfil.Latitude;
            perfil.Longitude = model.Longitude != 0 ? model.Longitude : perfil.Longitude;
            perfil.Telefone = !string.IsNullOrEmpty(model.Telefone) ? model.Telefone : perfil.Telefone;
            perfil.Telefone2 = !string.IsNullOrEmpty(model.Telefone2) ? model.Telefone2 : perfil.Telefone2;
            perfil.Descricao = !string.IsNullOrEmpty(model.Descricao) ? model.Descricao : perfil.Descricao;

            _context.PerfilEmpresa.Update(perfil);
            _context.SaveChanges();
        }

        public void AddPerfilEmpresa(CadastroPerfilModel model, out PerfilEmpresa perfil)
        {
            perfil = new PerfilEmpresa()
            {
                IdEmpresa = model.IdEmpresa,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Descricao = model.Descricao,
                Telefone = model.Telefone,
                Telefone2 = model.Telefone2
            };

            _context.PerfilEmpresa.Add(perfil);
            _context.SaveChanges();
        }

        public Task UpdateConta(AtualizeContaModel model)
        {
            try
            {
                ContaEmpresa conta = _context.ContaEmpresa.FirstOrDefault(c => c.IdEmpresa == model.IdEmpresa);

                if (conta == null)
                {
                    throw new Exception();
                }

                conta.Resumo = !string.IsNullOrEmpty(model.Resumo) ? model.Resumo : conta.Resumo;
                conta.ValorPontos = model.ValorPontos != 0 ? model.ValorPontos : conta.ValorPontos;
                conta.Categoria = model.Categoria != 0 ? model.Categoria : conta.Categoria;

                _context.ContaEmpresa.Update(conta);

                Entidade.ImagemPerfil imagemPerfilEmpresa = new Entidade.ImagemPerfil()
                {
                    IdEmpresa = model.IdEmpresa,
                    Imagem = model.Logo,
                    //GuidImagem = Guid.NewGuid().ToString()
                };

                new ImagemService(_context).SaveImagemPerfilEmpresa(imagemPerfilEmpresa);
                return _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<DTODadosEmpresaAdmin> SelectEmpresaAdmin(Guid idEmpresa)
        {
            return new DTODadosEmpresaAdmin()
            {
                Empresa = await _context.Empresa.FirstOrDefaultAsync(a => a.IdEmpresa.Equals(idEmpresa)),
                PerfisEmpresaCatalogo = from perfil in _context.PerfilEmpresa.Where(a => a.IdEmpresa.Equals(idEmpresa))
                                        select new DTOPerfilEmpresaCatalogo()
                                        {
                                            Perfil = perfil,
                                            Catalogo = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == perfil.IdPerfilEmpresa)
                                        },
                ContaEmpresa = await _context.ContaEmpresa.FirstOrDefaultAsync(a => a.IdEmpresa.Equals(idEmpresa)),
            };
        }

        public async Task<DTODadosEmpresaLoja> SelectEmpresaLoja(Guid idEmpresa, Guid idPerfilEmpresa)
        {
            return new DTODadosEmpresaLoja()
            {
                Empresa = await _context.Empresa.FirstOrDefaultAsync(a => a.IdEmpresa.Equals(idEmpresa)),
                PerfilEmpresa = await _context.PerfilEmpresa.FirstOrDefaultAsync(a => a.IdPerfilEmpresa.Equals(idPerfilEmpresa)),
                ContaEmpresa = await _context.ContaEmpresa.FirstOrDefaultAsync(a => a.IdEmpresa.Equals(idEmpresa)),
                ImagensCatalogo = _context.ImagemCatalogo.Where(i => i.IdPerfilEmpresa.Equals(idPerfilEmpresa))
            };
        }


        public Task<List<Entidade.Empresa.PerfilEmpresa>> SelectPerfisEmpresa(Guid idEmpresa)
        {
            return _context.PerfilEmpresa.Where(p => p.IdEmpresa.Equals(idEmpresa)).ToListAsync();
        }

        public Task AddIdNotificacao(int? idEmpresa, string tokenNotificacao)
        {
            PerfilEmpresa perfil = _context.PerfilEmpresa.First(p => p.IdEmpresa.Equals(idEmpresa));
            perfil.IdsNotificacao = perfil.IdsNotificacao ?? new List<string>();

            if (!perfil.IdsNotificacao.Any(n => n == tokenNotificacao))
            {
                perfil.IdsNotificacao.Add(tokenNotificacao);
                _context.PerfilEmpresa.Update(perfil);
            }

            return _context.SaveChangesAsync();
        }
    }
}
