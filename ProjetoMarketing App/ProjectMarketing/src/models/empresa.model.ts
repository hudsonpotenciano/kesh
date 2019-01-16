import { Venda } from "./models.model";

export class Empresa {
    Email: string;
    IdEmpresa: string;
    Nome: string;
    Categoria: number;
}

export class Conta {
    IdEmpresa: string;
    Categoria: number;
    Resumo: string;
    ValorPontos: number;
}

export class Perfil {
    Descricao: string;
    IdPerfilEmpresa: string;
    IdEmpresa: string;
    Telefone: string;
    Telefone2: string;
    Latitude: number;
    Longitude: number;
}

export class NotaComentarioPessoaEmpresa {
    NomePessoa: string;
    IdPessoa: string;
    IdPerfilEmpresa: string;
    Nota: number;
    Comentario: string;
    DataAvaliacao: Date;
}

export class ImagemCatalogo {
    GuidImagem: string;
    Imagem: any;
}

export class AtualizeContaModel {
    IdEmpresa: string;
    Resumo: string;
    ValorPontos: number;
    Categorias: number[];
    Logo: any;
}

export class AtualizaPerfilModel {
    constructor() {
        this.Catalogo = [];
    }
    IdPerfilEmpresa: string;
    Descricao: string;
    Latitude: number;
    Longitude: number;
    Telefone: string;
    Telefone2: string;
    IdEmpresa: string;
    Catalogo: ImagemCatalogo[];
}

export class CadastroPerfilModel extends AtualizaPerfilModel {
    IdEmpresa: string;
}

export class CadastroEmpresaModel {
    Cnpj: string;
    Nome: string;
    Email: string;
    Descricao: string;
    Telefone: string;
    Telefone2: string;
    Senha: string;
    SenhaAdmin: string;
    Logo: any;
    Resumo: string;
    ValorPontos: number;
    Latitude: number;
    Longitude: number;
    Categoria: number;
    Catalogo: ImagemCatalogo[];
    NomeNoCartao: string;
    NumeroDoCartao: number;
    ValidadeDoCartao: Date;
    CodigoDeVerificacaoDoCartao: number;
    constructor() {
        this.ValidadeDoCartao = new Date();
    }
}

export class DadosEmpresaLoja {
    Empresa: Empresa;
    Perfil: Perfil;
    Conta: Conta;
    Catalogo: ImagemCatalogo[];
}

export class DadosEmpresaAdmin {
    Empresa: Empresa;
    PerfisEmpresaCatalogo: PerfilEmpresaCatalogo[];
    Conta: Conta;
}

export class PerfilEmpresaCatalogo {
    Perfil: Perfil;
    Catalogo: ImagemCatalogo[];
}

export class VendaAdminLoja {
    Venda: Venda;
    NomeLoja: string;
}