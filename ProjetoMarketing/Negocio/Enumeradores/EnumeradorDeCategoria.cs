using System;

namespace ProjetoMarketing.Negocio.Enumeradores
{
    public class EnumeradorDeCategoria : Enumerador<EnumeradorDeCategoria, int>
    {
        public static EnumeradorDeCategoria AlimentosEBebidas = new EnumeradorDeCategoria(0, "Alimentos e Bebidas");
        public static EnumeradorDeCategoria Educacao = new EnumeradorDeCategoria(1, "Educação");
        public static EnumeradorDeCategoria CasaEJardim = new EnumeradorDeCategoria(2, "Casa e Jardim");
        public static EnumeradorDeCategoria EsporteELazer = new EnumeradorDeCategoria(3, "Esporte e Lazer");
        public static EnumeradorDeCategoria EsteticaEBeleza = new EnumeradorDeCategoria(4, "Estética e Beleza");
        public static EnumeradorDeCategoria Informatica = new EnumeradorDeCategoria(5, "Informática");
        public static EnumeradorDeCategoria Saude = new EnumeradorDeCategoria(6, "Saúde");
        public static EnumeradorDeCategoria Servicos = new EnumeradorDeCategoria(7, "Serviços");
        public static EnumeradorDeCategoria Automoveis = new EnumeradorDeCategoria(8, "Automóveis");
        public static EnumeradorDeCategoria BrinquedosEGames = new EnumeradorDeCategoria(9, "Brinquedos e Games");
        public static EnumeradorDeCategoria Entreterimento = new EnumeradorDeCategoria(10, "Entreterimento");
        public static EnumeradorDeCategoria ModaEAcessorios = new EnumeradorDeCategoria(11, "Moda e Acessórios");
        public static EnumeradorDeCategoria Animais = new EnumeradorDeCategoria(12, "Animais");
        public static EnumeradorDeCategoria Outros = new EnumeradorDeCategoria(13, "Outros");

        public EnumeradorDeCategoria(int codigo, string descricao) : base(codigo, descricao)
        {
        }
    }
}
