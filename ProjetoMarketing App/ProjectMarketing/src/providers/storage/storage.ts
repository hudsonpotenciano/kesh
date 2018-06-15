import { Injectable } from '@angular/core';
import { RetornoLogin } from '../../models/pessoa.model';

@Injectable()
export class StorageProvider {

  constructor() {
  }

  DADOS_ACESSO = "DADOS_ACESSO";

  armazene(chave, valor) {
    if (typeof valor == 'object') {
      valor = JSON.stringify(valor);
    }
    localStorage.setItem(chave, valor);
  };

  recupere(chave) {

    var strArmazenado = localStorage.getItem(chave);
    var objArmazenado = null;
    if (strArmazenado != null) {
      try {
        objArmazenado = JSON.parse(strArmazenado);
      }
      catch (e) {
        objArmazenado = strArmazenado;
      }
    }
    return objArmazenado;
  };

  remova = function (chave) {
    localStorage.removeItem(chave);
  };

  armazeneDadosAcesso(value: any) {
    this.armazene(this.DADOS_ACESSO, value);
  }

  recupereDadosAcesso() : RetornoLogin {
    return this.recupere(this.DADOS_ACESSO);
  }

  removaDadosAcesso() {
    this.remova(this.DADOS_ACESSO);
  }
}
