namespace ProjetoMarketing.Models
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
        public string Token { get; set; }

        public bool Authenticated { get; set; }
        public static RetornoRequestModel CrieFalhaLogin()
        {
            return new RetornoRequestModel
            {
                Mensagem = "Login Incorreto",
                Erro = 1,
                Authenticated = false
            };
        }

        public static RetornoRequestModel CrieFalha()
        {
            return new RetornoRequestModel
            {
                Mensagem = "",
                Erro = -1,
                Authenticated = false
            };
        }

        public static RetornoRequestModel CrieSucesso()
        {
            return new RetornoRequestModel();
        }

        public static RetornoRequestModel CrieFalhaDuplicidade()
        {
            return new RetornoRequestModel
            {
                Erro = 2,
                Authenticated = false
            };
        }
    }
}
