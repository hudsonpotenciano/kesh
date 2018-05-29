import { Injectable } from '@angular/core';
import { RetornoRequestModel, RetornoLogin, User } from '../../models/pessoa.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class LoginEmpresaProvider {

  constructor(
    private comunicacao: ComunicacaoProvider,
    private storage: StorageProvider) {
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("empresa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }
}
