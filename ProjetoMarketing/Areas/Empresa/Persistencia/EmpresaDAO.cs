using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Areas.Empresa.DTO;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade.Empresa;
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

        public Task AddIdNotificacao(int idPerfilEmpresa, string tokenNotificacao)
        {
            return Task.Factory.StartNew(() =>
            {
                PerfilEmpresa perfilEmpresa = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa == idPerfilEmpresa);
                if (!perfilEmpresa.IdsNotificacao.ToList().Any(n => n == tokenNotificacao))
                {
                    perfilEmpresa.IdsNotificacao.ToList().Add(tokenNotificacao);
                    _context.PerfilEmpresa.Update(perfilEmpresa);
                }

                _context.SaveChangesAsync();
            });
        }

        public Task AddEmpresaUsuario(CadastroEmpresaModel model, out Entidade.Empresa.Empresa empresa, out Entidade.Usuario usuario)
        {
            empresa = new Entidade.Empresa.Empresa()
            {
                Cnpj = model.Cnpj,
                Email = model.Email,
                Nome = model.Nome
            };

            //Necessário para obter o IDEMPRESA
            _context.Empresa.Add(empresa);
            _context.SaveChanges();

            ContaEmpresa conta = new Entidade.Empresa.ContaEmpresa()
            {
                ValorPontos = model.ValorPontos,
                Resumo = model.Resumo,
                Categoria = model.Categoria,
                IdEmpresa = empresa.IdEmpresa
            };

            Entidade.ImagemPerfil imagemPerfilEmpresa = new Entidade.ImagemPerfil()
            {
                IdEmpresa = empresa.IdEmpresa,
                Imagem = model.Logo
            };

            PerfilEmpresa perfil = new Entidade.Empresa.PerfilEmpresa()
            {
                IdEmpresa = empresa.IdEmpresa,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Descricao = model.Descricao,
                Telefone = model.Telefone,
                Telefone2 = model.Telefone2,
            };

            usuario = new Entidade.Usuario()
            {
                IdEmpresa = empresa.IdEmpresa,
                Login = model.Email,
                Token = Autentication.Seguranca.GerarHashMd5(model.Email, model.Senha),
                TokenEmpresaAdmin = Autentication.Seguranca.GerarHashMd5(model.Email, model.SenhaAdmin)
            };

            _context.Usuario.Add(usuario);
            _context.PerfilEmpresa.Add(perfil);
            _context.ContaEmpresa.Add(conta);
            _context.ImagemPerfil.Add(imagemPerfilEmpresa);
            return _context.SaveChangesAsync();
        }

        public Task UpdatePerfil(CadastroPerfilModel model)
        {
            PerfilEmpresa perfil = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa == model.IdPerfilEmpresa);
            perfil.Latitude = model.Latitude != 0 ? model.Latitude : perfil.Latitude;
            perfil.Longitude = model.Longitude != 0 ? model.Longitude : perfil.Longitude;
            perfil.Telefone = !string.IsNullOrEmpty(model.Telefone) ? model.Telefone : perfil.Telefone;
            perfil.Telefone2 = !string.IsNullOrEmpty(model.Telefone2) ? model.Telefone2 : perfil.Telefone2;
            perfil.Descricao = !string.IsNullOrEmpty(model.Descricao) ? model.Descricao : perfil.Descricao;

            _context.PerfilEmpresa.Update(perfil);
            return _context.SaveChangesAsync();
        }

        public Task AddPerfilEmpresa(CadastroPerfilModel model, out PerfilEmpresa perfil)
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
            return _context.SaveChangesAsync();
        }

        public Task UpdateConta(AtualizeContaModel model)
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

            Entidade.ImagemPerfil imagemPerfilEmpresa = _context.ImagemPerfil.FirstOrDefault(i => i.IdEmpresa == model.IdEmpresa);
            if (imagemPerfilEmpresa != null)
            {
                imagemPerfilEmpresa.Imagem = model.Logo;
                _context.ImagemPerfil.Update(imagemPerfilEmpresa);
            }

            return _context.SaveChangesAsync();
        }

        public async Task<DTODadosEmpresaAdmin> SelectEmpresaAdmin(int idEmpresa)
        {
            return new DTODadosEmpresaAdmin()
            {
                Empresa = await _context.Empresa.FirstOrDefaultAsync(a => a.IdEmpresa == idEmpresa),
                PerfisEmpresaCatalogo = from perfil in _context.PerfilEmpresa.Where(a => a.IdEmpresa == idEmpresa)
                                        select new DTOPerfilEmpresaCatalogo()
                                        {
                                            Perfil = perfil,
                                            Catalogo = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == perfil.IdPerfilEmpresa)
                                        },
                ContaEmpresa = await _context.ContaEmpresa.FirstOrDefaultAsync(a => a.IdEmpresa == idEmpresa),
            };
        }

        public async Task<DTODadosEmpresaLoja> SelectEmpresaLoja(int idEmpresa, long idPerfilEmpresa)
        {
            return new DTODadosEmpresaLoja()
            {
                Empresa = await _context.Empresa.FirstOrDefaultAsync(a => a.IdEmpresa == idEmpresa),
                PerfilEmpresa = await _context.PerfilEmpresa.FirstOrDefaultAsync(a => a.IdPerfilEmpresa == idPerfilEmpresa),
                ContaEmpresa = await _context.ContaEmpresa.FirstOrDefaultAsync(a => a.IdEmpresa == idEmpresa),
                ImagensCatalogo = _context.ImagemCatalogo.Where(i => i.IdPerfilEmpresa == idPerfilEmpresa)
            };
        }


        public Task<List<Entidade.Empresa.PerfilEmpresa>> SelectPerfisEmpresa(int idEmpresa)
        {
            return _context.PerfilEmpresa.Where(p => p.IdEmpresa == idEmpresa).ToListAsync();
        }

        public Task AddIdNotificacao(int? idEmpresa, string tokenNotificacao)
        {
            PerfilEmpresa perfil = _context.PerfilEmpresa.First(p => p.IdEmpresa == idEmpresa);
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
