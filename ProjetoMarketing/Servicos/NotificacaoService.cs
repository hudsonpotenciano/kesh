using Newtonsoft.Json;
using ProjetoMarketing.Contexts;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoMarketing.Servicos
{
    public class NotificacaoService
    {
        public static NotificacaoService Instancia => new NotificacaoService();

        public void EnvieNotificacaoDeCompartilhamento(int idPessoa, PessoaEmpresaContext _context)
        {
            Entidade.Pessoa.Pessoa pessoa = _context.Pessoa.FirstOrDefault(p => p.IdPessoa == idPessoa);

            Task.Factory.StartNew(() =>
            {
                if (pessoa != null &&
                    pessoa.IdsNotificacao != null &&
                    pessoa.IdsNotificacao.Count > 0)
                {
                    EnvieNotificacao(pessoa.IdsNotificacao, $"Você acabou de receber um cupom de {pessoa.Nome}");
                }
            });
        }

        private void EnvieNotificacao(List<string> playersIds, string Mensagem)
        {
            HttpWebRequest request = WebRequest.Create("https://onesignal.com/api/v1/notifications") as HttpWebRequest;

            request.KeepAlive = true;
            request.Method = "POST";
            request.ContentType = "application/json; charset=utf-8";

            request.Headers.Add("authorization", "Basic YzY4Y2E4ZjItZjdmMi00YTBkLThkMzgtM2FmYzc3YjZiMTQx");

            var obj = new
            {
                app_id = "ea436908-f1d4-41ad-aaaa-47c1cdba8a30",
                contents = new { en = Mensagem },
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
                //gerar log
                System.Diagnostics.Debug.WriteLine(ex.Message);
                System.Diagnostics.Debug.WriteLine(new StreamReader(ex.Response.GetResponseStream()).ReadToEnd());
            }
        }
    }
}
