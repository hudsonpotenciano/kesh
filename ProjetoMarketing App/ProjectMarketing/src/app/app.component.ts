import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { StorageProvider } from '../providers/storage/storage';
import { UnidadeDeMedidaLocalizacao } from '../models/pessoa.model';
import { OneSignal } from '@ionic-native/onesignal';
import { StorageEmpresaProvider } from '../providers/storage/storage-empresa';
import { UtilitariosProvider } from '../providers/utilitarios/utilitarios';

@Component({
  templateUrl: 'app.html'

})
export class MyApp {

  rootPage: any;
  TabsPessoaPage: any = "TabsPessoaPage";
  TabsEmpresaPage: any = "TabsEmpresaPage";
  @ViewChild(Nav) nav: Nav;

  constructor(

    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private storageProvider: StorageProvider,
    private utilitarios: UtilitariosProvider,
    private storageEmpresa: StorageEmpresaProvider,
    private events: Events,
    private oneSignal: OneSignal) {

    platform.ready().then(() => {
      statusBar.styleBlackOpaque();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#fcc000");
      splashScreen.hide();

      if (platform.is("cordova"))
        this.initOneSignal();
    });

    this.initLogin();

    this.initTranslate();

    this.events.subscribe("forcar-retorno-login", () => {
      var dadosAcesso = this.storageProvider.recupereDadosAcesso();
      if (dadosAcesso !== null && dadosAcesso !== undefined && dadosAcesso.IdEmpresa !== this.utilitarios.guid36Empty())
        this.nav.setRoot("LoginEmpresaPage");
      else {
        this.nav.setRoot("LoginPessoaPage");
      }

      this.storageProvider.limpeTudo();
    });
  }

  initLogin() {

    var dadosAcesso = this.storageProvider.recupereDadosAcesso();
    console.log(dadosAcesso);

    if (dadosAcesso !== null && dadosAcesso !== undefined) {
      if (dadosAcesso.IdEmpresa && dadosAcesso.IdEmpresa !== this.utilitarios.guid36Empty() && dadosAcesso.Token != "") {
        if (this.storageEmpresa.recupereIdPerfilEmpresa())
          this.rootPage = "TabsEmpresaLojaPage";
        else {
          this.rootPage = this.TabsEmpresaPage;
        }
      }
      else if (dadosAcesso.IdPessoa && dadosAcesso.IdPessoa !== this.utilitarios.guid36Empty() && dadosAcesso.Token != "") {
        this.rootPage = this.TabsPessoaPage;
      }
      else {
        this.rootPage = "IntroducaoPage";
      }
    }
    else {
      this.rootPage = "IntroducaoPage";
    }
  }

  initOneSignal() {

    this.oneSignal.startInit('ea436908-f1d4-41ad-aaaa-47c1cdba8a30', '744359904337');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit();

    var idNotificacao = this.storageProvider.recupereIdNotificacao();

    if (idNotificacao === "") {
      this.oneSignal.getIds()
        .then((retorno) => {
          this.storageProvider.armazeneIdNotificacao(retorno.userId);
        }).catch(() => {

        });
    }
  }

  initTranslate() {
    // Definir o idioma padrão para as sequências de tradução e o idioma atual.
    this.translate.setDefaultLang('pt-br');

    this.translate.use(navigator.language.toLowerCase());
    // mudar a linguagem de acordo com a linguagem selecionada nas configuracoes 

    //unidade de medida
    this.storageProvider.armazeneUnidadeDeMedidaLocalizacao(UnidadeDeMedidaLocalizacao.Kilometros);
    this.storageProvider.armazeneCultura(navigator.language.toLowerCase());
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  sair() {

  }
}