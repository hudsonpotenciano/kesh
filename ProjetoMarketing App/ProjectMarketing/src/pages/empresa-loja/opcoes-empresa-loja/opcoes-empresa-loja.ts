import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, App, NavController } from 'ionic-angular';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { DadosEmpresaLoja, ImagemCatalogo } from '../../../models/empresa.model';
import { StorageProvider } from '../../../providers/storage/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-opcoes-empresa-loja',
  templateUrl: 'opcoes-empresa-loja.html',
})

export class OpcoesEmpresaLojaPage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') Slides: Slides;

  imagensCatalogo: ImagemCatalogo[] = [];
  dadosEmpresa: DadosEmpresaLoja;

  constructor(private storageEmpresa: StorageEmpresaProvider,
    private storage: StorageProvider,
    private splashScreen: SplashScreen,
    private app: App,
    private utilitarios:UtilitariosProvider,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer) {
    this.sanitizer;
    this.dadosEmpresa = this.storageEmpresa.recupereDadosEmpresaLoja()
    this.imagensCatalogo = this.dadosEmpresa.Catalogo;
  };

  ionViewDidLoad() {

  }

  abraEdicao() {
    this.navCtrl.push("PerfilEmpresaLojaPage");
  }

  sair() {
    this.utilitarios.facaPerguntaSimNao("Tem certeza de que deseja sair ?",
      () => {
        this.saia()
      },() => {

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
