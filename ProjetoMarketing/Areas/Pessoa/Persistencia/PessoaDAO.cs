using ProjetoMarketing.Areas.Pessoa.Context;
using ProjetoMarketing.Autentication.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace ProjetoMarketing.Areas.Pessoa.Persistencia
{
    public class PessoaDAO
    {
        private readonly PessoaContext _context;

        public PessoaDAO(PessoaContext context)
        {
            _context = context;
        }

        public Entidade.Usuario AddPessoaUsuario(Models.CadastroPessoaModel model, UsuarioContext _contextUsuario)
        {
            try
            {
                using (TransactionScope scope = new TransactionScope())
                {
                    var pessoa = new Entidade.Pessoa.Pessoa()
                    {
                        CpfCnpj = model.CpfCnpj,
                        Email = model.CpfCnpj,
                        Nome = model.Nome,
                        Telefone = model.Telefone
                    };

                    _context.Pessoa.Add(pessoa);
                    _context.SaveChanges();

                    var perfil = new Entidade.Pessoa.PerfilPessoa()
                    {
                        Foto = model.Foto != null ? Convert.FromBase64String(model.Foto) : null,
                        IdPessoa = pessoa.IdPessoa
                    };

                    _context.PerfilPessoa.Add(perfil);
                    _context.SaveChanges();

                    var usuario = new Entidade.Usuario()
                    {
                        IdPessoa = pessoa.IdPessoa,
                        Login = model.Email,
                        Senha = model.Senha
                    };

                    new UsuarioDAO(_contextUsuario).Add(usuario);

                    scope.Complete();

                    return usuario;
                }
            }
            catch (Exception)
            {
                //SALVE LOG
            }

            return null;
        }

        public void Remove(Entidade.Pessoa.Pessoa pessoa)
        {
            _context.Pessoa.Remove(pessoa);
            _context.SaveChanges();
        }

        public void Update(Entidade.Pessoa.Pessoa pessoa)
        {
            var result = _context.Pessoa.SingleOrDefault(p => p.IdPessoa == pessoa.IdPessoa);
            if (result != null)
            {
                result = pessoa;
                _context.SaveChanges();
            }
        }

        public void Update(Entidade.Pessoa.PerfilPessoa perfil)
        {
            var result = _context.PerfilPessoa.SingleOrDefault(p => p.IdPessoa == perfil.IdPessoa);
            if (result != null)
            {
                result = perfil;
                _context.SaveChanges();
            }
        }
    }
}
