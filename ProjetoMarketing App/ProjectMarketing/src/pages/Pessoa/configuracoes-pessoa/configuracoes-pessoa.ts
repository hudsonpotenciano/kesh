import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StorageProvider } from '../../../providers/storage/storage';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { SplashScreen } from '@ionic-native/splash-screen';

@IonicPage()
@Component({
  selector: 'page-configuracoes-pessoa',
  templateUrl: 'configuracoes-pessoa.html',
})
export class ConfiguracoesPessoaPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private storage: StorageProvider,
    private splashScreen: SplashScreen,
    private utilitarios: UtilitariosProvider,
    private storageProvider: StorageProvider,
    private socialSharing: SocialSharing) {
    this.storageProvider;
  }

  ionViewDidLoad() {
  }

  compartilhe() {
    this.socialSharing.share("Já conhece o *Kesh*? Faça suas compras e acumule *$keshs*. É só instalar o app e começar a usar");
  }

  abraTutorial() {

  }

  mudarSenha() {

  }

  abraPerfilPessoa() {

    this.app.getRootNavs()[0].push("PerfilPessoaPage");
  }

  sair() {
    this.utilitarios.facaPerguntaSimNao("Tem certeza de que deseja sair ?",
      () => {
        this.saia()
      }, () => {

      })
  }

  saia() {
    this.app.getRootNavs()[0].setRoot("IntroducaoPage");
    this.storage.limpeTudo();
    this.splashScreen.show();
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }
}
