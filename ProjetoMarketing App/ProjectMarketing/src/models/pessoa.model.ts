export class RetornoLogin {
    Token: string;
    IdPessoa: number;
    IdEmpresa: number;
    AccessToken: string;
}

export class RetornoRequestModel {
    Mensagem: string;
    AccessToken: string;
    Result: any;
    Erro: number;
}

export class User {
    Login: string;
    Senha: string;
}

export class Usuario {
    Login: string;
    Senha: string;
    IdUsuario: number;
    IdPessoa: number;
    IdEmpresa: number;
    Token: string;
}

export class CadastroPessoaModel {
    CpfCnpj: string;
    Nome: string;
    Email: string;
    Telefone: string;
    Senha: string;
    Foto: any;
}

export class CadastroEmpresaModel {
    Cnpj: string;
    Nome: string;
    Email: string;
    Telefone: string;
    Telefone2: string;
    Senha: string;
    Logo: any;
    Resumo : string;
    RecompensaCompartilhamento : number;
    RecompensaPontos:number;
    Latitude:string;
    Longitude:string;
    Categorias: number[];
}

export class Pessoa {
    IdPessoa: number;
    CpfCnpj: string;
    Nome: string;
    Email: string;
    Telefone: string;
}