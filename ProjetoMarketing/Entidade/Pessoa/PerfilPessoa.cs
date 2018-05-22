using System;
using System.ComponentModel.DataAnnotations;

namespace ProjetoMarketing.Entidade.Pessoa
{
    public class PerfilPessoa
    {
        [Key]
        public Guid Id { get; set; }
        public int IdPessoa { get; set; }
        public byte[] Foto { get; set; }
    }
}
