import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { CadastroEmpresaModel, Perfil, DadosEmpresaAdmin } from '../../models/empresa.model';
import { StorageEmpresaProvider } from '../storage/storage-empresa';

@Injectable()
export class EmpresaProvider {

  dadosAcesso: RetornoLogin;

  constructor(private storage: StorageProvider,
    private storageEmpresa: StorageEmpresaProvider,
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

  obtenhaDadosEmpresaAdmin() {
    return new Promise<DadosEmpresaAdmin>(resolve => {
      this.comunicacao.post("empresa/empresa/ObtenhaDadosEmpresaAdmin", { IdEmpresa: this.dadosAcesso.IdEmpresa })
        .then((resposta: RetornoRequestModel) => {

          resolve(resposta.Result);
          this.storageEmpresa.armazeneDadosEmpresaAdmin(resposta.Result);
        });
    });
  }

  obtenhaPerfisEmpresa() {
    return new Promise<Perfil[]>(resolve => {
      this.comunicacao.post("empresa/empresa/ObtenhaPerfisDaEmpresaParaSelecao", { IdEmpresa: this.dadosAcesso.IdEmpresa })
        .then((resposta: RetornoRequestModel) => {

          resolve(resposta.Result);
        });
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
}