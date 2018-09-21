import { Injectable } from '@angular/core';
import { Cupom, RetornoRequestModel, Venda, DTOCupomVenda } from '../../models/models.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';

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

  GereVenda(tokenCupom: string, valorVenda: number) {
    return new Promise<Venda>(resolve => {
      this.comunicacao.post("Transacao/GereVendaComCupom", { TokenCupom: tokenCupom, ValorDaVenda: valorVenda })
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

  ObtenhaCupomPeloToken(token: string) {
    return new Promise<Cupom>((resolve, reject) => {
      this.comunicacao.post("Transacao/ObtenhaCupomPeloToken", { CupomToken: token })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        }).catch(() => { reject(); });
    });
  }
}