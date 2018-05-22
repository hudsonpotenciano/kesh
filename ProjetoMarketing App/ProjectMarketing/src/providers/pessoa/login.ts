import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { MylocalStorageProvider } from '../mylocal-storage/mylocal-storage';
import { RetornoLogin, User, RetornoRequestModel } from '../../models/pessoa.model';

@Injectable()
export class LoginProvider {

  constructor(
    private comunicacao: ComunicacaoProvider,
    private myLocalStorage: MylocalStorageProvider) {
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("pessoa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.myLocalStorage.armazeneDadosAcesso(result);
      });
  }
}
