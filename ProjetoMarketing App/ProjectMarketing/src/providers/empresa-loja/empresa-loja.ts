import { Injectable } from '@angular/core';
import { StorageEmpresaProvider } from '../storage/storage-empresa';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { StorageProvider } from '../storage/storage';
import { RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { DadosEmpresaLoja, ImagemCatalogo, AtualizePerfilModel } from '../../models/empresa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';

@Injectable()
export class EmpresaLojaProvider {

  dadosAcesso: RetornoLogin;
  idPerfilSelecionado: number;

  constructor(private storage: StorageProvider,
    private storageEmpresa: StorageEmpresaProvider,
    private comunicacao: ComunicacaoProvider) {
    this.dadosAcesso = this.storage.recupereDadosAcesso();
    this.idPerfilSelecionado = this.storageEmpresa.recupereIdPerfilEmpresa();
  }

  obtenhaDadosEmpresaLoja() {
    return new Promise<DadosEmpresaLoja>(resolve => {
      this.comunicacao.post("empresa/empresa/ObtenhaDadosEmpresaLoja", {
        IdPerfilEmpresa: this.idPerfilSelecionado,
        IdEmpresa: this.dadosAcesso.IdEmpresa
      })
        .then((resposta: RetornoRequestModel) => {

          resolve(resposta.Result);
          this.storageEmpresa.armazeneDadosEmpresaLoja(resposta.Result);
        });
    });
  }

  //chamado no html
  obtenhaImagemCatalogo(idImagem: number) {
    return ComunicacaoSettings.UrlApiBase + "Empresa/Imagem/ObtenhaImagemCatalogo?idImagem=" + idImagem;
  }

  atualizePerfilEmpresa(perfil: AtualizePerfilModel) {

    return this.comunicacao.post("Empresa/Empresa/AtualizePerfilEmpresa", perfil)
      .then(() => {

      });
  }

  atualizeCatalogo(imagens: ImagemCatalogo[]) {

    return this.comunicacao.post("Empresa/Imagem/AtualizeCatalogo", { Imagens: imagens, IdPerfilEmpresa: this.idPerfilSelecionado })
      .then(() => {

      });
  }
}
