using ProjetoMarketing.Areas.Empresa.Context;
using ProjetoMarketing.Areas.Empresa.Models;
using ProjetoMarketing.Autentication.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class EmpresaDAO
    {
        private readonly EmpresaContext _context;

        public EmpresaDAO(EmpresaContext context)
        {
            _context = context;
        }

        public Entidade.Usuario AddEmpresaUsuario(CadastroEmpresaModel model, UsuarioContext _contextUsuario)
        {

            try
            {
                using (var transaction = _context.Database.BeginTransaction())
                {
                    var empresa = new Entidade.Empresa.Empresa()
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
                        RecompensaCompartilhamento = model.RecompensaCompartilhamento,
                        RecompensaPontos = model.RecompensaPontos,
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
                    };

                    _context.ImagensEmpresa.Add(imagensEmpresa);
                    _context.SaveChanges();

                    var usuario = new Entidade.Usuario()
                    {
                        IdEmpresa = empresa.IdEmpresa,
                        Login = model.Email,
                        Senha = model.Senha
                    };

                    transaction.Commit();

                    new UsuarioDAO(_contextUsuario).Add(usuario);

                    return usuario;
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

        public dynamic SelectEmpresas()
        {
            return (from empresa in _context.Empresa
                    join perfil in _context.PerfilEmpresa on empresa.IdEmpresa equals perfil.IdEmpresa
                    select new
                    {
                        empresa.Email,
                        empresa.IdEmpresa,
                        empresa.Nome,
                        empresa.Telefone,
                        perfil.Latitude,
                        perfil.Longitude,
                        perfil.RecompensaCompartilhamento,
                        perfil.RecompensaPontos,
                        perfil.Resumo,
                        perfil.Categorias
                    }).ToList();
        }
    }
}
