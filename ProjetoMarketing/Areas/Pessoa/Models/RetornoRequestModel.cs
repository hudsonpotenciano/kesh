namespace ProjetoMarketing.Areas.Pessoa.Models
{
    public class RetornoRequestModel
    {
        public RetornoRequestModel()
        {
            Mensagem = string.Empty;
            Erro = 0;
        }
        public string Mensagem { get; set; }
        public int Erro { get; set; }
        public dynamic Result { get; set; }
        public string AccessToken { get; set; }
        public bool Authenticated { get; set; }
        public static RetornoRequestModel CrieFalhaLogin()
        {
            return new RetornoRequestModel
            {
                Mensagem = "Login Incorreto",
                Erro = 1,
                Authenticated = false,
                AccessToken = ""
            };
        }

        public static RetornoRequestModel CrieSucesso()
        {
            return new RetornoRequestModel();
        }
    }
}
