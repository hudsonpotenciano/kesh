using System;

namespace ProjetoMarketing.Negocio
{
    public class Localizacao
    {
        public static double DistanceTo(double lat1, double lon1, double lat2, double lon2, Enumeradores.Enumeradores.UnidadeMedidaLocalizacao unit)
        {
            double rlat1 = Math.PI * lat1 / 180;
            double rlat2 = Math.PI * lat2 / 180;
            double theta = lon1 - lon2;
            double rtheta = Math.PI * theta / 180;
            double dist =
                Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                Math.Cos(rlat2) * Math.Cos(rtheta);
            dist = Math.Acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;

            switch (unit)
            {
                case Enumeradores.Enumeradores.UnidadeMedidaLocalizacao.Kilometros:
                    return dist * 1.609344;
                case Enumeradores.Enumeradores.UnidadeMedidaLocalizacao.Milhas:
                    return dist;
            }

            return dist;
        }

        //public static string GereDistanciaUnidadeMedida(double distancia, Enumeradores.Enumeradores.UnidadeMedidaLocalizacao unit)
        //{
        //    switch (unit)
        //    {
        //        case Enumeradores.Enumeradores.UnidadeMedidaLocalizacao.Kilometros:
        //            {
        //                if (distancia <= 0)
        //                {
        //                    return string.Concat(distancia.ToString("0.0"), " m");
        //                }

        //                return string.Concat(distancia.ToString("0.0"), " km");
        //            }
        //        case Enumeradores.Enumeradores.UnidadeMedidaLocalizacao.Milhas:
        //            return string.Concat(distancia.ToString("0.0"), " mi");
        //    }

        //    return string.Concat(distancia.ToString("0.0"), " mi");
        //}
    }
}
