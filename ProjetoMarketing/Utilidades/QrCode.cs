using ZXing;
using ZXing.Common;

namespace ProjetoMarketing.Utilidades
{
    public class QrCode
    {
        public string GereQrCode(string text)
        {
            try
            {
                var barcodeWriter = new BarcodeWriterSvg
                {
                    Format = BarcodeFormat.QR_CODE,
                    Options = new EncodingOptions()
                    {
                        Height = 200,
                        Width = 200
                    }
                };

                return barcodeWriter.Write("https://jeremylindsayni.wordpress.com/").Content;
            }
            catch
            {
                throw;
            }
        }
    }
}
