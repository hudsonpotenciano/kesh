using Microsoft.EntityFrameworkCore;
using ProjetoMarketing.Contexts;
using ProjetoMarketing.Entidade;
using ProjetoMarketing.Entidade.Empresa;
using ProjetoMarketing.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Persistencia
{
    public class TransacaoDAO
    {
        private readonly TransacaoContext _context;

        public TransacaoDAO(TransacaoContext context)
        {
            _context = context;
        }

        public void GereCompartilhamento(ParametrosCompartilhamento parametros, out Compartilhamento compartilhamento)
        {
            try
            {
                compartilhamento = new Compartilhamento()
                {
                    IdEmpresa = parametros.IdEmpresa,
                    IdPessoa = parametros.IdPessoa,
                    IdsPessoas = parametros.IdsPessoas,
                    Data = DateTime.Today
                };

                _context.Compartilhamento.Add(compartilhamento);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void GereCupom(ParametrosCompartilhamento model, PerfilEmpresa perfilEmpresa, out Cupom cupom, long idCompartilhamento)
        {
            try
            {
                cupom = new Cupom()
                {
                    Desconto = perfilEmpresa.DescontoCompartilhamento,
                    IdEmpresa = model.IdEmpresa,
                    IdPessoa = model.IdPessoa,
                    Data = DateTime.Now,
                    IdCompartilhamento = idCompartilhamento
                };

                _context.Cupom.Add(cupom);
                _context.SaveChanges();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void GereVendaComCupom(ParametrosCupomVenda model, Cupom cupom, out Venda venda)
        {
            try
            {
                venda = new Venda()
                {
                    IdCupom = cupom.IdCupom,
                    IdPessoa = cupom.IdPessoa,
                    IdEmpresa = cupom.IdEmpresa,
                    Valor = model.ValorDaVenda
                    //Fazer calculo do valor
                };

                _context.Venda.Add(venda);
                _context.SaveChanges();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<List<Cupom>> ObtenhaCuponsEmpresa(int idEmpresa)
        {
            try
            {
                return _context.Cupom.Where(c => c.IdEmpresa == idEmpresa).ToListAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<List<Venda>> ObtenhaVendasEmpresa(int idEmpresa)
        {
            try
            {
                return _context.Venda.Where(v => v.IdEmpresa == idEmpresa).ToListAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<List<Cupom>> ObtenhaCuponsPessoa(int idPessoa)
        {
            try
            {
                return _context.Cupom.Where(c => c.IdPessoa == idPessoa).ToListAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<List<Venda>> ObtenhaVendasPessoa(int idPessoa)
        {
            try
            {
                return _context.Venda.Where(v => v.IdPessoa == idPessoa).ToListAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<Cupom> ObtenhaCupomPeloToken(ParametrosObtenhaCupom parametros)
        {
            try
            {
                return _context.Cupom.FromSql($@"select * from public.cupom
                                                 where cupom.token = {parametros.CupomToken} and cupom.idempresa = {parametros.IdEmpresa}
                                                 and not exists (select idvenda from venda where venda.idcupom = cupom.idcupom)").FirstOrDefaultAsync();
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task<bool> PessoaPodeCompartilhar(ParametrosObtenhaPessoasCompartilhamento parametros)
        {
            try
            {
                return _context.Compartilhamento.FromSql($@"select idcompartilhamento from compartilhamento where compartilhamento.idpessoa = {parametros.IdPessoa}
                                                          and compartilhamento.idempresa = {parametros.IdEmpresa}
                                                          and compartilhamento.data >= {DateTime.Today}").AnyAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
