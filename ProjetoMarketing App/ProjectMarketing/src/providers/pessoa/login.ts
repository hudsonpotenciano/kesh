import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { RetornoLogin, User, RetornoRequestModel } from '../../models/pessoa.model';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class LoginPessoaProvider {

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
