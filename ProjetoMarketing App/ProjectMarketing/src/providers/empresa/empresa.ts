import { Injectable } from '@angular/core';
import { CadastroEmpresaModel } from '../../models/pessoa.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';

@Injectable()
export class EmpresaProvider {

  constructor(private comunicacao: ComunicacaoProvider) {
  }

  CadastreEmpresa(pessoa: CadastroEmpresaModel) {

    return this.comunicacao.post("Empresa/Empresa/CadastreEmpresa", pessoa)
      .then(() => {

      });
  }

  ObtenhaFotoPessoa(idEmpresa: number) {
    return ComunicacaoSettings.UrlApiBase + "Empresa/Empresa/ObtenhaFotoEmpresa?idEmpresa=" + idEmpresa;
  }
}
