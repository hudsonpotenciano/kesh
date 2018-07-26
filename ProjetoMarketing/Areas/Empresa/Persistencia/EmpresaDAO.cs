using Microsoft.EntityFrameworkCore;
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

        public void AddEmpresa(CadastroEmpresaModel model, out Entidade.Empresa.Empresa empresa)
        {
            try
            {
                empresa = new Entidade.Empresa.Empresa()
                {
                    Cnpj = model.Cnpj,
                    Email = model.Email,
                    Nome = model.Nome,
                    Telefone = model.Telefone,
                    Telefone2 = model.Telefone2,
                    Latitude = model.Latitude,
                    Longitude = model.Longitude
                };

                _context.Empresa.Add(empresa);
                _context.SaveChanges();

                var perfil = new Entidade.Empresa.PerfilEmpresa()
                {
                    IdEmpresa = empresa.IdEmpresa,
                    DescontoCompartilhamento = model.DescontoCompartilhamento,
                    ValorPontos = model.ValorPontos,
                    Resumo = model.Resumo,
                    Categorias = model.Categorias
                };

                _context.PerfilEmpresa.Add(perfil);
                _context.SaveChanges();

                var imagemPerfilEmpresa = new Entidade.ImagemPerfil()
                {
                    IdEmpresa = empresa.IdEmpresa,
                    Imagem = model.Logo
                };

                _context.ImagemPerfil.Add(imagemPerfilEmpresa);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                //SALVE LOG
                throw e;
            }
        }

        public void Add(Entidade.Empresa.PerfilEmpresa perfil)
        {
            _context.PerfilEmpresa.Add(perfil);
            _context.SaveChanges();
        }

        public Task<List<Entidade.Empresa.Empresa>> SelectEmpresas()
        {
            try
            {
                return _context.Empresa.ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public Task<Entidade.Empresa.Empresa> SelectEmpresa(int idEmpresa)
        {
            try
            {
                return _context.Empresa.FirstOrDefaultAsync(e => e.IdEmpresa == idEmpresa);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<Entidade.Empresa.ImagemCatalogo>> SelectCatalogoEmpresa(int idEmpresa)
        {
            try
            {
                return _context.ImagemCatalogo.Where(a => a.IdEmpresa == idEmpresa).ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<Entidade.Empresa.PerfilEmpresa> SelectPerfilEmpresa(int idEmpresa)
        {
            try
            {
                return _context.PerfilEmpresa.FirstOrDefaultAsync(e => e.IdEmpresa == idEmpresa);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public Task<List<Entidade.Empresa.PerfilEmpresa>> SelectPerfilEmpresas()
        {
            try
            {
                return _context.PerfilEmpresa.ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
