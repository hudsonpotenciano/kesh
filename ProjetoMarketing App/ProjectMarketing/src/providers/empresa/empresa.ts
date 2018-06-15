import { Injectable } from '@angular/core';
import { CadastroEmpresaModel, User, RetornoLogin, RetornoRequestModel } from '../../models/pessoa.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class EmpresaProvider {

  constructor(private storage: StorageProvider,
    private comunicacao: ComunicacaoProvider) {
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("empresa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }

  CadastreEmpresa(empresa: CadastroEmpresaModel) {

    return this.comunicacao.post("Empresa/Empresa/CadastreEmpresa", empresa)
      .then(() => {

      });
  }

  ObtenhaLogoEmpresa(idEmpresa: number) {
    return ComunicacaoSettings.UrlApiBase + "Empresa/Empresa/ObtenhaLogoEmpresa?idEmpresa=" + idEmpresa;
  }

}
