
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

export class SocialUser {
    Email: string;
    Id: string;
}

export class Usuario {
    Login: string;
    Senha: string;
    IdUsuario: number;
    IdPessoa: number;
    IdEmpresa: number;
    Token: string;
}

export class Cupom {
    Desconto: number;
    IdCupom: number;
    Token: string;
    Validade: Date;
    IdPerfilEmpresa: number;
    IdPessoa: number;
}

export class Venda {
    IdCupom: number;
    Valor: number;
    IdPerfilEmpresa: number;
    IdPessoa: number;
}

export class VendaPessoa {
    Nome: string;
    IdPessoa: number;
    IdVenda: number;
    Valor: number;
    IdCupom: number;
    IdPerfilEmpresa: number;
}

export class GoogleMaps {
    static Style: any = [
        {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        },
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#fcc000' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
        },
        {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
        },
        {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
        }
    ];
}