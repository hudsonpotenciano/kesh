using System;

namespace ProjetoMarketing.Negocio.Enumeradores
{
    public class EnumeradorDeArea : Enumerador<EnumeradorDeArea, int>
    {
        public static EnumeradorDeArea Roupas = new EnumeradorDeArea(0, "Roupas");
        public static EnumeradorDeArea Beleza = new EnumeradorDeArea(1, "Beleza");
        public static EnumeradorDeArea Sapatos = new EnumeradorDeArea(2, "Sapatos");
        public static EnumeradorDeArea Acessorios = new EnumeradorDeArea(3, "Acessorios");
        public static EnumeradorDeArea Perfumaria = new EnumeradorDeArea(4, "Perfumaria");
        public static EnumeradorDeArea Bebes = new EnumeradorDeArea(5, "Bebes");

        public EnumeradorDeArea(int codigo, string descricao) : base(codigo, descricao)
        {
        }
    }
}
