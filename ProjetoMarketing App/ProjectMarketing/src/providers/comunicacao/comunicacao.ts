import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { MylocalStorageProvider } from '../mylocal-storage/mylocal-storage';

@Injectable()
export class ComunicacaoProvider {

  constructor(
    public http: HttpClient,
    private mylocalStorage: MylocalStorageProvider) {
  }

  get(servico: string, params?: any) {

    let reqOpts: any;
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(ComunicacaoSettings.UrlApiBase + servico, reqOpts)
      .toPromise()
      .catch((e: any) => this.trateErros(e))
  }

  post(servico: string, body: any) {

    this.monteBodyBase(body);

    debugger;
    
    return this.http.post(ComunicacaoSettings.UrlApiBase + servico, body)
      .toPromise()
      .catch((e: any) => this.trateErros(e));
  }

  trateErros(erro: any) {

    console.error(erro);
  }

  monteBodyBase(body: any) {

    let dadosAcesso = this.mylocalStorage.recupereDadosAcesso();
    if (!dadosAcesso) return;

    body.Token = dadosAcesso.Token;
    body.AcessToken = dadosAcesso.AccessToken;
  }
}
