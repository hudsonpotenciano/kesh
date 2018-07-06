using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Contexts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Transactions;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class EmpresaDAO
    {
        private readonly PessoaEmpresaContext _context;

        public EmpresaDAO(PessoaEmpresaContext context)
        {
            _context = context;
        }

        public void AddEmpresaUsuario(CadastroEmpresaModel model, out Entidade.Empresa.Empresa empresa)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    empresa = new Entidade.Empresa.Empresa()
                    {
                        Cnpj = model.Cnpj,
                        Email = model.Email,
                        Nome = model.Nome,
                        Telefone = model.Telefone,
                        Telefone2 = model.Telefone2
                    };

                    _context.Empresa.Add(empresa);
                    _context.SaveChanges();

                    var perfil = new Entidade.Empresa.PerfilEmpresa()
                    {
                        IdEmpresa = empresa.IdEmpresa,
                        Latitude = model.Latitude,
                        Longitude = model.Longitude,
                        DescontoCompartilhamento = model.DescontoCompartilhamento,
                        ValorPontos = model.ValorPontos,
                        Resumo = model.Resumo,
                        Categorias = model.Categorias
                    };

                    _context.PerfilEmpresa.Add(perfil);
                    _context.SaveChanges();

                    var imagensEmpresa = new Entidade.Empresa.ImagensEmpresa()
                    {
                        IdEmpresa = empresa.IdEmpresa,
                        Imagem = model.Logo,
                        Tipo = 1
                        //ENUMERADOR 
                    };

                    _context.ImagensEmpresa.Add(imagensEmpresa);
                    _context.SaveChanges();
                }
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
    }
}
