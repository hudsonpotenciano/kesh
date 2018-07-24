export class Empresa {
    Email: string;
    IdEmpresa: number;
    Nome: string;
    Telefone: string;
    Telefone2: string;
    RecompensaCompartilhamento: number;
    RecompensaPontos: number;
    Resumo: string;
    Categorias: number[];
    Latitude: number;
    Longitude: number;
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
    Latitude: number;
    Longitude: number;
    Categorias: number[];
}

export class PerfilEmpresa {
    IdEmpresa: number;
    RecompensaCompartilhamento: string;
    RecompensaPontos: string;
    Resumo: string;
    Categorias: number[];
    Catalogo: ImagemCatalogo[];
}

export class NotaComentarioPessoaEmpresa {
    Nome: string;
    IdPessoa: number;
    Nota: number;
    Comentario: string;
}

export class ImagemCatalogo {
    IdImagem: number;
    Imagem: any;
}

export class DadosEmpresa {
    Empresa: Empresa;
    PerfilEmpresa: PerfilEmpresa;
}