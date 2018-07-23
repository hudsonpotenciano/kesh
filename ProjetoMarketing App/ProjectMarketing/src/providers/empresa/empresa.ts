import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { CadastroEmpresaModel } from '../../models/empresa.model';

@Injectable()
export class EmpresaProvider {

  dadosAcesso: RetornoLogin;

  constructor(private storage: StorageProvider,
    private comunicacao: ComunicacaoProvider) {
    this.dadosAcesso = this.storage.recupereDadosAcesso();
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("empresa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }

  cadastreEmpresa(empresa: CadastroEmpresaModel) {

    return this.comunicacao.post("Empresa/Empresa/CadastreEmpresa", empresa)
      .then(() => {

      });
  }

  obtenhaLogoEmpresa(idEmpresa: number) {
    return ComunicacaoSettings.UrlApiBase + "Empresa/Imagem/ObtenhaLogoEmpresa?idEmpresa=" + idEmpresa;
  }

  atualizeCatalogo(imagens: any[]) {

    return this.comunicacao.post("Empresa/Imagem/AtualizeCatalogo", { Imagens: imagens, IdEmpresa: this.dadosAcesso.IdEmpresa })
      .then(() => {

      });
  }
}