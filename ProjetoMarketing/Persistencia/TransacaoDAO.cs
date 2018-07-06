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

        public void GereCupom(ParametrosGeracaoDeCupom model, PerfilEmpresa perfilEmpresa, out Cupom cupom)
        {
            try
            {
                cupom = new Cupom()
                {
                    Desconto = perfilEmpresa.DescontoCompartilhamento,
                    IdEmpresa = model.IdEmpresa,
                    IdPessoa = model.IdPessoa,
                    Validade = DateTime.Now
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
    }
}
