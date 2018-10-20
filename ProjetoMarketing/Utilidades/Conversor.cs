using System.Globalization;

namespace ProjetoMarketing.Utilidades
{
    public class Conversor
    {
        private static CultureInfo ObtenhaCultura(string cultura)
        {
            return string.IsNullOrEmpty(cultura) ? new CultureInfo("pt-br") : new CultureInfo(cultura);
        }

        public static decimal ToMoney(decimal valor, string paramCultura)
        {
            CultureInfo cultura = ObtenhaCultura(paramCultura);
            return decimal.Parse(valor.ToString("00.00", cultura), cultura);
        }
    }
}
