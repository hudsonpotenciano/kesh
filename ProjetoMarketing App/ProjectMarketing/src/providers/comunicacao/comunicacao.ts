import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { RetornoRequestModel } from '../../models/models.model';
import { Events } from 'ionic-angular';

@Injectable()
export class ComunicacaoProvider {

  tentativasDePost: number = 0;

  constructor(
    public http: HttpClient,
    private storage: StorageProvider,
    private events: Events) {

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
      .catch((e: any) => alert(e))
  }

  post(servico: string, body: any) {
    
    this.monteBodyBase(body);

    return new Promise<any>((resolve, reject) => {

      if (!navigator.onLine) {
        alert("Sem conexao com a internet" + servico);
        reject({ Erro: -1 } as RetornoRequestModel);
        return;
      }

      this.http.post(ComunicacaoSettings.UrlApiBase + servico, body, this.monteOptions())
        .toPromise()
        .then((response) => {

          let retorno: RetornoRequestModel = response as any;

          if (retorno.Erro != 0) {

            if (retorno.Mensagem && retorno.Mensagem != "")
              alert(retorno.Mensagem)

            reject(retorno);
            return;
          }

          resolve(retorno);
        })
        .catch((e: any) => {

          if (e.status == 401) {

            if (this.tentativasDePost++ >= 3) {
              this.tentativasDePost = 0;
              this.events.publish("forcar-retorno-login");
            }
            else {

              var dadosAcesso = this.storage.recupereDadosAcesso();

              this.http.post(ComunicacaoSettings.UrlApiBase + "Compartilhado/ObtenhaBearerToken", { Token: dadosAcesso.Token }, this.monteOptions())
                .toPromise()
                .then((retorno: any) => {

                  dadosAcesso.AccessToken = retorno.Result.AcessToken;
                  this.storage.armazeneDadosAcesso(dadosAcesso);

                  this.post(servico, body)
                    .then((result) => {
                      resolve(result);
                      this.tentativasDePost = 0;
                    });
                });
            }
          }
          else {
            alert(e.message);
          }
        });
    });
  }

  monteBodyBase(body: any) {

    let dadosAcesso = this.storage.recupereDadosAcesso();
    body.Token = dadosAcesso ? dadosAcesso.Token : "";
    body.Cultura = this.storage.recupereCultura();
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
