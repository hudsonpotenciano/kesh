import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { CadastroEmpresaModel, ImagemCatalogo, DadosEmpresa } from '../../models/empresa.model';
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

  obtenhaDadosEmpresa() {
    return new Promise<DadosEmpresa>(resolve => {
      this.comunicacao.post("empresa/empresa/ObtenhaDadosEmpresa", { IdEmpresa: this.dadosAcesso.IdEmpresa })
        .then((resposta: RetornoRequestModel) => {
          debugger;
          resolve(resposta.Result);
          this.storageEmpresa.armazeneDadosEmpresa(resposta.Result);
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

  obtenhaImagemCatalogo(idImagem: number) {
    return ComunicacaoSettings.UrlApiBase + "Empresa/Imagem/ObtenhaImagemCatalogo?idImagem=" + idImagem;
  }

  atualizeCatalogo(imagens: ImagemCatalogo[]) {

    return this.comunicacao.post("Empresa/Imagem/AtualizeCatalogo", { Imagens: imagens, IdEmpresa: this.dadosAcesso.IdEmpresa })
      .then(() => {

      });
  }
}