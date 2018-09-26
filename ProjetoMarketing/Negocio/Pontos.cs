using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoMarketing.Negocio
{
    public class Pontos
    {
        public static decimal CalculePontos(decimal pontos,decimal valorPontos)
        {
            if (pontos <= 0 || valorPontos < 1) return 0;
            //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
            return pontos / valorPontos;
        }

        public static decimal CalculeEquivalente(decimal valorDaVenda, decimal valorPontos)
        {
            //Calcula quantos pontos valem o dinheiro da venda
            //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
            return valorDaVenda * valorPontos;
        }
    }
}
