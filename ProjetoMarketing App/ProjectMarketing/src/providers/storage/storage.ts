import { Injectable } from '@angular/core';
import { RetornoLogin, Localizacao } from '../../models/models.model';
import { UnidadeDeMedidaLocalizacao } from '../../models/pessoa.model';

@Injectable()
export class StorageProvider {

  DADOS_ACESSO = "DADOS_ACESSO";
  ID_NOTIFICACAO = "ID_NOTIFICACAO";
  UNID_MEDIDA_LOCALIZACAO = "UNID_MEDIDA_LOCALIZACAO";
  CULTURA = "CULTURA";
  CACHE_1DIA = "CACHE_1DIA";
  LOCALIZACAO = "LOCALIZACAO";

  constructor() {
  }

  limpeTudo() {
    var idNotificao = this.recupereIdNotificacao();
    localStorage.clear();
    this.armazeneIdNotificacao(idNotificao);
  }

  armazene(chave, valor) {
    valor = JSON.stringify(valor);
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

  //CULTURA
  armazeneUnidadeDeMedidaLocalizacao(value: UnidadeDeMedidaLocalizacao) {
    this.armazene(this.UNID_MEDIDA_LOCALIZACAO, value);
  }

  recupereUnidadeDeMedidaLocalizacao(): UnidadeDeMedidaLocalizacao {
    return this.recupere(this.UNID_MEDIDA_LOCALIZACAO);
  }

  armazeneCultura(value: string) {
    this.armazene(this.CULTURA, value);
  }

  recupereCultura(): string {
    return this.recupere(this.CULTURA);
  }

  //DADOS ACESSO
  armazeneDadosAcesso(value: any) {
    this.armazene(this.DADOS_ACESSO, value);
  }

  recupereDadosAcesso(): RetornoLogin {
    return this.recupere(this.DADOS_ACESSO);
  }

  removaDadosAcesso() {
    this.remova(this.DADOS_ACESSO);
  }

  //LOCALIZACAO
  armazeneLocalizacao(value: Localizacao) {
    this.armazene(this.LOCALIZACAO, value);
  }

  recupereLocalizacao(): Localizacao {
    return this.recupere(this.LOCALIZACAO);
  }

  removaLocalizacao() {
    this.remova(this.LOCALIZACAO);
  }

  //NOTIFICACAO
  armazeneIdNotificacao(value: any) {
    this.armazene(this.ID_NOTIFICACAO, value);
  }

  recupereIdNotificacao(): RetornoLogin {
    return this.recupere(this.ID_NOTIFICACAO);
  }

  removaIdNotificacao() {
    this.remova(this.ID_NOTIFICACAO);
  }
}
