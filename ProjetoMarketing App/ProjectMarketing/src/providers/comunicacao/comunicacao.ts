import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class ComunicacaoProvider {

  constructor(
    public http: HttpClient,
    private storage: StorageProvider) {
  }

  get(servico: string, params?: any) {

    let reqOpts: any;
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(ComunicacaoSettings.UrlApiBase + servico, this.monteOptions())
      .toPromise()
      .catch((e: any) => this.trateErros(e))
  }

  post(servico: string, body: any) {

    this.monteBodyBase(body);

    return new Promise<any>(resolve => {
      this.http.post(ComunicacaoSettings.UrlApiBase + servico, body, this.monteOptions())
        .toPromise()
        .then((response) => {
          resolve(response);
        })
        .catch((e: any) => this.trateErros(e))
    });
  }

  trateErros(erro: any) {

    alert(erro);
    console.error(erro);
  }

  monteBodyBase(body: any) {

    let dadosAcesso = this.storage.recupereDadosAcesso();
    body.Token = dadosAcesso ? dadosAcesso.Token : "";
  }

  monteOptions(): any {

    let dadosAcesso = this.storage.recupereDadosAcesso();

    let headers = {};
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    headers['Authorization'] = 'Bearer ' + (dadosAcesso != null ? dadosAcesso.AccessToken : "");

    return { headers };
  }
}
