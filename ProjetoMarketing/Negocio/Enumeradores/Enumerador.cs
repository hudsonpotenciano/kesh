using System.Collections.Generic;
using System.Reflection;

namespace ProjetoMarketing.Negocio.Enumeradores
{
    public class Enumerador<T, TK> : IEnumerador<TK> where T : IEnumerador<TK>
    {
        public TK Codigo { get; protected set; }

        public string Descricao { get; protected set; }

        protected Enumerador(TK codigo, string descricao)
        {
        }

        public bool Equals(Enumerador<T, TK> obj)
        {
            return obj.Codigo.Equals(Codigo);
        }

        public override int GetHashCode()
        {
            return Codigo.GetHashCode();
        }
        public static T Obtenha(TK codigo)
        {
            IList<T> todos = ObtenhaTodos();

            foreach (var item in todos)
                if (item.Codigo.Equals(codigo))
                    return item;

            return default(T);
        }

        public static List<T> ObtenhaTodos()
        {
            var todos = new List<T>();

            var tipo = typeof(T);

            foreach (var campo in tipo.GetFields(BindingFlags.Static | BindingFlags.Public))
            {
                var item = (T)campo.GetValue(null);
                todos.Add(item);
            }

            return todos;
        }
        public static List<T> ObtenhaTodos(int[] codigos)
        {
            var todos = new List<T>();

            return todos;
        }
    }
}
