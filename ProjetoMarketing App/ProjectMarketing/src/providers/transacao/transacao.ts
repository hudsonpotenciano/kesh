import { Injectable } from '@angular/core';
import { Cupom, RetornoRequestModel, Venda, DTOCupomVenda } from '../../models/models.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { VendaAdminLoja } from '../../models/empresa.model';
import { DTOCupomParaVenda } from '../../models/pessoa.model';

@Injectable()
export class TransacaoProvider {

  constructor(private comunicacao: ComunicacaoProvider) {

  }

  GereCupomCompartilhamento(idPerfilEmpresa: number, idEmpresa: number, idPessoa: number, idsPessoas: number[]) {
    return new Promise<Cupom>(resolve => {
      this.comunicacao.post("Transacao/GereCupomCompartilhamento", { IdPerfilEmpresa: idPerfilEmpresa, IdEmpresa: idEmpresa, IdPessoa: idPessoa, IdsPessoas: idsPessoas })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  GereVenda(tokenCupom: string, valorVenda: number, utilizarPontos: boolean) {
    return new Promise<Venda>(resolve => {
      this.comunicacao.post("Transacao/GereVendaComCupom", { TokenCupom: tokenCupom, ValorDaVenda: valorVenda, UsarPontos: utilizarPontos })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  obtenhaCuponsEVendasEmpresaAdmin(IdEmpresa: number) {
    return new Promise<VendaAdminLoja[]>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasEmpresaAdmin", { IdEmpresa: IdEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCuponsEVendasEmpresa(idPerfilEmpresa: number) {
    return new Promise<any>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasEmpresa", { IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCuponsEVendasPessoaEmpresa(idPerfilEmpresa: number, idPessoa: number) {
    return new Promise<any>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasPessoaEmpresa", { IdPerfilEmpresa: idPerfilEmpresa, IdPessoa: idPessoa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  PessoaPodeCompartilhar(idPerfilEmpresa: number, idPessoa: number) {

    return new Promise<boolean>(resolve => {
      this.comunicacao.post("Transacao/PessoaPodeCompartilhar",
        { IdPessoa: idPessoa, IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCuponsEVendasPessoa(idPessoa: number) {
    return new Promise<DTOCupomVenda[]>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasPessoa", { IdPessoa: idPessoa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCupomPeloToken(token: string, idPerfilEmpresa: number) {
    return new Promise<DTOCupomParaVenda>((resolve, reject) => {
      this.comunicacao.post("Transacao/ObtenhaCupomPeloToken", { CupomToken: token, IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        }).catch(() => { reject(); });
    });
  }

  CalculePontos(pontos, valorPontos) {
    if (pontos <= 0 || valorPontos < 1) return 0;
    //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
    return pontos / valorPontos;
  }

  CalculeEquivalente(valorDaVenda, valorPontos) {
    //Calcula quantos pontos valem o dinheiro da venda
    //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
    return valorDaVenda * valorPontos;
  }
}