using System;

namespace ProjetoMarketing.Negocio
{
    public class Cupom
    {
        public static bool CalculeDataPodeCompartilhar(DateTime data)
        {
            if (data == null)
            {
                return false;
            }

            return data >= DateTime.Today.AddDays(-10);
        }
    }
}
