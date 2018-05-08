namespace ProjetoMarketing.Negocio.Enumeradores
{
    public interface IEnumerador<TK>
    {
        TK Codigo { get; }
        string Descricao { get; }
    }
}
