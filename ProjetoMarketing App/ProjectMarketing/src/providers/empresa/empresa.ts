import { Injectable } from '@angular/core';
import { CadastroEmpresaModel } from '../../models/pessoa.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';

@Injectable()
export class EmpresaProvider {

  constructor(private comunicacao: ComunicacaoProvider) {
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
