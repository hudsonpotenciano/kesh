import { Empresa, PerfilEmpresa } from "./empresa.model";


export class CadastroPessoaModel {
    Nome: string;
    Email: string;
    Telefone: string;
    Senha: string;
    Foto: any;
}

export class Pessoa {
    IdPessoa: number;
    Nome: string;
    Email: string;
    Telefone: string;
}

export class PessoaEmpresa {
    Empresa: Empresa;
    Comentario: string;
    Nota: number;
    Pontuacao: number;
    NotaGeral: number;
}

export class DadosPessoaPerfilEmpresa {
    PessoaEmpresas: PessoaEmpresa[];
    PerfilEmpresas: PerfilEmpresa[];
}