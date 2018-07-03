

export class CadastroPessoaModel {
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
    Resumo: string;
    DescontoCompartilhamento: number;
    ValorPontos: number;
    Latitude: string;
    Longitude: string;
    Categorias: number[];
}

export class Pessoa {
    IdPessoa: number;
    Nome: string;
    Email: string;
    Telefone: string;
}