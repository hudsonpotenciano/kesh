import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';

@Injectable()
export class PessoaProvider {

  constructor(private comunicacao: ComunicacaoProvider) {
  }

  CadastrePessoa(pessoa: CadastroPessoaModel) {

    return this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
      .then(() => {

      });
  }

  ObtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }
}
