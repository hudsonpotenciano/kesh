import { Injectable } from '@angular/core';
import { Cupom, RetornoRequestModel, Venda } from '../../models/models.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';

@Injectable()
export class TransacaoProvider {

  constructor(private comunicacao: ComunicacaoProvider) {

  }

  GereCupomCompartilhamento(idEmpresa: number, idPessoa: number, idsPessoas: number[]) {
    return new Promise<Cupom>(resolve => {
      this.comunicacao.post("Transacao/GereCupomCompartilhamento", { IdEmpresa: idEmpresa, IdPessoa: idPessoa, IdsPessoas: idsPessoas })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  GereVenda(tokenCupom: string, valorVenda: number) {
    return new Promise<Venda>(resolve => {
      this.comunicacao.post("Cupom/GereVendaComCupom", { TokenCupom: tokenCupom, ValorDaVenda: valorVenda })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCuponsEVendasEmpresa(idEmpresa: number) {
    return new Promise<any>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasEmpresa", { IdEmpresa: idEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  PessoaPodeCompartilhar(idEmpresa: number, idPessoa: number) {

    return new Promise<boolean>(resolve => {
      this.comunicacao.post("Transacao/PessoaPodeCompartilhar",
        { IdPessoa: idPessoa, IdEmpresa: idEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaCuponsEVendasPessoa(idPessoa: number) {
    return new Promise<any>(resolve => {
      this.comunicacao.post("Transacao/ObtenhaCuponsEVendasPessoa", { IdPessoa: idPessoa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }
}