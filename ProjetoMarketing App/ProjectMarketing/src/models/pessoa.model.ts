import { Empresa, Perfil, ImagemCatalogo, Conta } from "./empresa.model";


export class CadastroPessoaModel {
    Nome: string;
    Email: string;
    Senha: string;
    Foto: any;
}

export class CadastroPessoaRedeSocialModel {
    Nome: string;
    Email: string;
    Id: string;
    Foto: any;
}

export class Pessoa {
    IdPessoa: number;
    Nome: string;
    Email: string;
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
    Empresa: Empresa;
    Perfil: Perfil;
    PessoaEmpresa: PessoaEmpresa;
    Conta: Conta;
    NotaGeral: number;
    Distancia: string;
    Catalogo: ImagemCatalogo[];
}

export enum UnidadeDeMedidaLocalizacao {
    Kilometros,
    Milhas
}