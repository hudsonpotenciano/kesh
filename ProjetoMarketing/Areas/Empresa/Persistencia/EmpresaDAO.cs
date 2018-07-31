using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Areas.Empresa.DTO;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace ProjetoMarketing.Areas.Empresa.Persistencia
{
    public class EmpresaDAO
    {
        private readonly PessoaEmpresaContext _context;

        public EmpresaDAO(PessoaEmpresaContext context)
        {
            _context = context;
        }

        public Task AddEmpresa(CadastroEmpresaModel model, out Entidade.Empresa.Empresa empresa)
        {
            try
            {
                empresa = new Entidade.Empresa.Empresa()
                {
                    Cnpj = model.Cnpj,
                    Email = model.Email,
                    Nome = model.Nome
                };

                _context.Empresa.Add(empresa);
                _context.SaveChanges();

                var conta = new Entidade.Empresa.ContaEmpresa()
                {
                    DescontoCompartilhamento = model.DescontoCompartilhamento,
                    ValorPontos = model.ValorPontos,
                    Resumo = model.Resumo,
                    Categorias = model.Categorias,
                    IdEmpresa = empresa.IdEmpresa
                };

                var imagemPerfilEmpresa = new Entidade.ImagemPerfil()
                {
                    IdEmpresa = empresa.IdEmpresa,
                    Imagem = model.Logo
                };

                var perfil = new Entidade.Empresa.PerfilEmpresa()
                {
                    IdEmpresa = empresa.IdEmpresa,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude,
                    Descricao = model.Descricao,
                    Telefone = model.Telefone,
                    Telefone2 = model.Telefone2,
                };

                _context.PerfilEmpresa.Add(perfil);
                _context.ContaEmpresa.Add(conta);
                _context.ImagemPerfil.Add(imagemPerfilEmpresa);

                return _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task UpdatePerfil(CadastroPerfilModel model)
        {
            try
            {
                var perfil = _context.PerfilEmpresa.FirstOrDefault(p => p.IdPerfilEmpresa == model.IdPerfilEmpresa);
                perfil.Latitude = model.Latitude != 0 ? model.Latitude : perfil.Latitude;
                perfil.Longitude = model.Longitude != 0 ? model.Longitude : perfil.Longitude;
                perfil.Telefone = !string.IsNullOrEmpty(model.Telefone) ? model.Telefone : perfil.Telefone;
                perfil.Telefone2 = !string.IsNullOrEmpty(model.Telefone2) ? model.Telefone2 : perfil.Telefone2;
                perfil.Descricao = !string.IsNullOrEmpty(model.Descricao) ? model.Descricao : perfil.Descricao;

                _context.PerfilEmpresa.Update(perfil);
                return _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task UpdateConta(AtualizeContaModel model)
        {
            try
            {
                var conta = _context.ContaEmpresa.FirstOrDefault(c => c.IdEmpresa == model.IdEmpresa);

                if (conta == null) throw new Exception();

                conta.Resumo = !string.IsNullOrEmpty(model.Resumo) ? model.Resumo : conta.Resumo;
                conta.ValorPontos = model.ValorPontos != 0 ? model.ValorPontos : conta.ValorPontos;
                conta.DescontoCompartilhamento = model.DescontoCompartilhamento != 0 ? model.DescontoCompartilhamento : conta.DescontoCompartilhamento;
                conta.Categorias = model.Categorias != null ? model.Categorias : conta.Categorias;

                _context.ContaEmpresa.Update(conta);

                var imagemPerfilEmpresa = _context.ImagemPerfil.FirstOrDefault(i => i.IdEmpresa == model.IdEmpresa);
                if (imagemPerfilEmpresa != null)
                {
                    imagemPerfilEmpresa.Imagem = model.Logo;
                    _context.ImagemPerfil.Update(imagemPerfilEmpresa);
                }

                return _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<DTODadosEmpresaAdmin> SelectEmpresaAdmin(int idEmpresa)
        {
            try
            {
                return Task.Factory.StartNew(() => new DTODadosEmpresaAdmin()
                {
                    Empresa = _context.Empresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                    PerfisEmpresa = _context.PerfilEmpresa.Where(a => a.IdEmpresa == idEmpresa),
                    ContaEmpresa = _context.ContaEmpresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<DTODadosEmpresaLoja> SelectEmpresaLoja(int idEmpresa, long idPerfilEmpresa)
        {
            try
            {
                return Task.Factory.StartNew(() => new DTODadosEmpresaLoja()
                {
                    Empresa = _context.Empresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                    PerfilEmpresa = _context.PerfilEmpresa.FirstOrDefault(a => a.IdPerfilEmpresa == idPerfilEmpresa),
                    ContaEmpresa = _context.ContaEmpresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                    ImagensCatalogo = _context.ImagemCatalogo.Where(i => i.IdPerfilEmpresa == idPerfilEmpresa)
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public Task<List<Entidade.Empresa.PerfilEmpresa>> SelectPerfisEmpresa(int idEmpresa)
        {
            try
            {
                return _context.PerfilEmpresa.Where(p => p.IdEmpresa == idEmpresa).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<decimal> SelectDesconto(int idEmpresa)
        {
            try
            {
                return _context.ContaEmpresa.Select(a => a.DescontoCompartilhamento).FirstOrDefaultAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
