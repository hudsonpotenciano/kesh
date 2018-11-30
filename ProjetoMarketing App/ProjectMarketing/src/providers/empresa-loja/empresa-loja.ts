import { Injectable } from '@angular/core';
import { StorageEmpresaProvider } from '../storage/storage-empresa';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { StorageProvider } from '../storage/storage';
import { RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { DadosEmpresaLoja, AtualizaPerfilModel } from '../../models/empresa.model';
import { EnumeradorDeCacheStorageEmpresaLoja, Enumerador } from '../../models/enumeradores.model';

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
    var enumeradorDeCache = new EnumeradorDeCacheStorageEmpresaLoja().obtenhaDadosEmpresaLoja;
    if (this.estaEmCach(enumeradorDeCache)) {
      return new Promise<DadosEmpresaLoja>(resolve => {
        var dados = this.storageEmpresa.recupereDadosEmpresaLoja();
        resolve(dados);
      });
    }
    else {

      return new Promise<DadosEmpresaLoja>(resolve => {
        this.comunicacao.post("empresa/empresa/ObtenhaDadosEmpresaLoja", {
          IdPerfilEmpresa: this.idPerfilSelecionado,
          IdEmpresa: this.dadosAcesso.IdEmpresa
        })
          .then((resposta: RetornoRequestModel) => {
            resolve(resposta.Result);
            this.storageEmpresa.armazeneDadosEmpresaLoja(resposta.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
          })
          .catch(() => {

          });
      });
    }
  }

  //chamado no html
  obtenhaImagemCatalogo(idImagem: number) {
    return "https://keshstorage.blob.core.windows.net/catalogo/" + idImagem + ".jpg";
    // return ComunicacaoSettings.UrlApiBase + "Empresa/Imagem/ObtenhaImagemCatalogo?idImagem=" + idImagem;
  }

  atualizePerfilEmpresa(perfil: AtualizaPerfilModel) {
    return this.comunicacao.post("Empresa/Empresa/AtualizePerfilEmpresa", perfil);
  }

  cadastrePerfilEmpresa(perfil: AtualizaPerfilModel) {
    perfil.IdEmpresa = this.dadosAcesso.IdEmpresa;
    return this.comunicacao.post("Empresa/Empresa/CadastrePerfilEmpresa", perfil);
  }

  estaEmCach(enumerador: Enumerador) {
    var cache = this.storage.recupere(enumerador.Descricao);
    if (cache && cache != undefined) {
      return !navigator.onLine || (cache > (new Date().getTime() - ((24 * 60 * 60 * 1000) * 1)))
    }
    return false;
  }
}
