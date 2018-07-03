
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

export class Enumerador {
    Codigo: number;
    Descricao: number;

    constructor(_codigo, _descricao) {
        this.Codigo = _codigo;
        this.Descricao = _descricao;
    }
}

export class Cupom {
    Desconto: number;
    IdCupom: number;
    Token: string;
    Validade: Date;
    IdEmpresa: number;
    IdPessoa: number;
}

export class Venda {
    IdCupom: number;
    Valor: number;
    IdEmpresa: number;
    IdPessoa: number;
}