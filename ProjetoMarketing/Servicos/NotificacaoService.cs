using Newtonsoft.Json;
using ProjetoMarketing.Entidade.Pessoa;
using System.IO;
using System.Net;
using System.Text;

namespace ProjetoMarketing.Servicos
{
    public class NotificacaoService
    {
        public static NotificacaoService Instancia => new NotificacaoService();

        public void EnvieNotificacaoDeCompartilhamento(Pessoa pessoa, string[] playersIds)
        {
            EnvieNotificacao(playersIds, $"Testando notificacao {pessoa.Nome}");
        }

        private void EnvieNotificacao(string[] playersIds, string MensagemPt)
        {
            HttpWebRequest request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.Headers.Add("authorization", "Basic NmE4OTA5YjMtMzQ0NS00OTcwLWFhYTgtOTE1NDgwZjY2YWYx");

            var obj = new
            {
                app_id = "ea436908-f1d4-41ad-aaaa-47c1cdba8a30",
                contents = new { en = "", pt = MensagemPt },
                include_player_ids = playersIds
            };

            string param = JsonConvert.SerializeObject(obj);
            byte[] byteArray = Encoding.UTF8.GetBytes(param);

            string responseContent = null;

            try
            {
                using (Stream writer = request.GetRequestStream())
                {
                    writer.Write(byteArray, 0, byteArray.Length);
                }

                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                    {
                        responseContent = reader.ReadToEnd();
                    }
                }
            }
            catch (WebException ex)
            {
                throw ex;
                //System.Diagnostics.Debug.WriteLine(ex.Message);
                //System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
            }
        }
    }
}
