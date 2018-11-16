import { Venda } from "./models.model";

export class Empresa {
    Email: string;
    IdEmpresa: number;
    Nome: string;
    RecompensaCompartilhamento: number;
    RecompensaPontos: number;
    Resumo: string;
    Categoria: number;
}

export class Conta {
    IdEmpresa: number;
    Categoria: number;
    Resumo: string;
    ValorPontos: number;
}

export class Perfil {
    Descricao: string;
    IdPerfilEmpresa: number;
    IdEmpresa: number;
    Telefone: string;
    Telefone2: string;
    Latitude: number;
    Longitude: number;
}

export class NotaComentarioPessoaEmpresa {
    Nome: string;
    IdPessoa: number;
    Nota: number;
    Comentario: string;
    DataAvaliacao: Date;
}

export class ImagemCatalogo {
    IdImagem: number;
    Imagem: any;
    IdPerfilEmpresa: number;
}

export class AtualizeContaModel {
    IdEmpresa: number;
    Resumo: string;
    ValorPontos: number;
    Categorias: number[];
    Logo: any;
}

export class AtualizaPerfilModel {
    constructor() {
        this.Catalogo = [];
    }
    IdPerfilEmpresa: number;
    Descricao: string;
    Latitude: number;
    Longitude: number;
    Telefone: string;
    Telefone2: string;
    IdEmpresa: number;
    Catalogo: ImagemCatalogo[];
}

export class CadastroPerfilModel extends AtualizaPerfilModel {
    IdEmpresa: number;
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