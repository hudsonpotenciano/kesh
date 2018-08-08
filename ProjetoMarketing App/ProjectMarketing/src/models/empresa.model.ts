export class Empresa {
    Email: string;
    IdEmpresa: number;
    Nome: string;
    RecompensaCompartilhamento: number;
    RecompensaPontos: number;
    Resumo: string;
    Categorias: number[];
}

export class Conta {
    IdEmpresa: number;
    Categorias: number;
    DescontoCompartilhamento: number;
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
}

export class AtualizeContaModel {
    IdEmpresa: number;
    Resumo: string;
    DescontoCompartilhamento: number;
    ValorPontos: number;
    Categorias: number[];
    Logo: any;
}

export class AtualizePerfilModel {
    IdPerfilEmpresa: number;
    Descricao: string;
    Latitude: number;
    Longitude: number;
    Telefone: string;
    Telefone2: string;
}

export class CadastroEmpresaModel {
    Cnpj: string;
    Nome: string;
    Email: string;
    Descricao: string;
    Telefone: string;
    Telefone2: string;
    Senha: string;
    Logo: any;
    Resumo: string;
    DescontoCompartilhamento: number;
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
    PerfisEmpresa: Perfil[];
    Conta: Conta;
}