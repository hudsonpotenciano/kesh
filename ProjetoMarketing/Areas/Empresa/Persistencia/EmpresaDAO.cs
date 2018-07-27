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

        public Task AddPerfil(CadastroPerfilModel model)
        {
            var perfil = new Entidade.Empresa.PerfilEmpresa()
            {
                IdEmpresa = model.IdEmpresa,
                Latitude = model.Latitude,
                Longitude = model.Longitude,
                Descricao = model.Descricao,
                Telefone = model.Telefone,
                Telefone2 = model.Telefone2,
            };

            _context.PerfilEmpresa.Add(perfil);
            return _context.SaveChangesAsync();
        }

        public Task<DTODadosEmpresa> SelectEmpresa(int idEmpresa)
        {
            try
            {
                return Task.Factory.StartNew(() => new DTODadosEmpresa()
                {
                    Empresa = _context.Empresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                    PerfisEmpresa = _context.PerfilEmpresa.FirstOrDefault(a => a.IdPerfilEmpresa == idEmpresa),
                    ContaEmpresa = _context.ContaEmpresa.FirstOrDefault(a => a.IdEmpresa == idEmpresa),
                    ImagensCatalogo = _context.ImagemCatalogo.Where(a => a.IdPerfilEmpresa == idEmpresa).ToList()
                });
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
