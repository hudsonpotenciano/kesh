import { Component, ViewChild } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { DadosEmpresaLoja } from '../../../models/empresa.model';
import { StorageProvider } from '../../../providers/storage/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-opcoes-empresa',
  templateUrl: 'opcoes-empresa.html',
})
export class OpcoesEmpresaPage {

  @ViewChild('fileInput') fileInput;

  dadosEmpresa: DadosEmpresaLoja;

  constructor(private storageEmpresa: StorageEmpresaProvider,
    private storage: StorageProvider,
    private splashScreen: SplashScreen,
    private app: App,
    private utilitarios:UtilitariosProvider,
    private sanitizer: DomSanitizer) {
    this.sanitizer;
    this.dadosEmpresa = this.storageEmpresa.recupereDadosEmpresaLoja()
  };

  abraEdicao() {
    this.app.getRootNavs()[0].push("ContaEmpresaPage");
  }

  sair() {
    this.utilitarios.facaPerguntaSimNao("Tem certeza de que deseja sair ?",
      () => {
        this.saia()
      }, () => {

      })
  }

  saia() {
    this.storage.limpeTudo();
    this.splashScreen.show();
    this.app.getRootNavs()[0].setRoot("IntroducaoPage");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }
}
