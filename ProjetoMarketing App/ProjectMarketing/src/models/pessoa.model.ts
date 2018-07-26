import { Empresa, Perfil, ImagemCatalogo, Conta } from "./empresa.model";


export class CadastroPessoaModel {
    Nome: string;
    Email: string;
    Telefone: string;
    Senha: string;
    Foto: any;
    Latitude: number;
    Longitude: number;
}

export class Pessoa {
    IdPessoa: number;
    Nome: string;
    Email: string;
    Telefone: string;
    Latitude: number;
    Longitude: number;
}

export class PessoaEmpresa {
    Empresa: Empresa;
    Catalogo: ImagemCatalogo[];
    Comentario: string;
    Nota: number;
    Pontuacao: number;
    NotaGeral: number;
}

export class DadosPessoaEmpresa {
    Empresa:Empresa;
    Perfil:Perfil;
    PessoaEmpresa:PessoaEmpresa;
    Conta:Conta;
    NotaGeral:number;
    Catalogo:ImagemCatalogo[];
}