import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { StorageProvider } from '../providers/storage/storage';
import { UnidadeDeMedidaLocalizacao } from '../models/pessoa.model';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'

})
export class MyApp {

  rootPage: any = "IntroducaoPage";
  @ViewChild(Nav) nav: Nav;

  constructor(

    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private translate: TranslateService,
    private storageProvider: StorageProvider,
    private oneSignal: OneSignal) {

    platform.ready().then(() => {
      statusBar.styleBlackOpaque();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#fcc000");
      splashScreen.hide();
      
      if (platform.is("cordova"))
        this.initOneSignal();
    });

    this.initTranslate();

    localStorage.clear();
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

    this.oneSignal.getIds()
      .then((retorno) => {
        this.storageProvider.armazeneIdNotificacao(retorno.userId);
      })
  }

  initTranslate() {
    // Definir o idioma padrão para as sequências de tradução e o idioma atual.
    this.translate.setDefaultLang('pt-br');

    this.translate.use('pt-br');
    // mudar a linguagem de acordo com a linguagem selecionada nas configuracoes 

    //unidade de medida
    this.storageProvider.armazeneUnidadeDeMedidaLocalizacao(UnidadeDeMedidaLocalizacao.Kilometros);
    this.storageProvider.armazeneCultura("pt-br");
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}