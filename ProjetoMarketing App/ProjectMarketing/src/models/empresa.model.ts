export class Empresa {
    Email: string;
    IdEmpresa: number;
    Nome: string;
    Telefone: string;
    Telefone2: string;
    Latitude: string;
    Longitude: string;
    RecompensaCompartilhamento: number;
    RecompensaPontos: number;
    Resumo: string;
    Categorias: number[];
}

export class PerfilEmpresa {
    IdEmpresa : number;
    Latitude : string;
    Longitude : string;
    RecompensaCompartilhamento : string;
    RecompensaPontos : string;
    Resumo : string;
    Categorias : number[];
}