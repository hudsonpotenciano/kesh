import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StorageProvider } from '../../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-configuracoes-pessoa',
  templateUrl: 'configuracoes-pessoa.html',
})
export class ConfiguracoesPessoaPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider,
    private socialSharing: SocialSharing) {
      this.storageProvider;
  }

  ionViewDidLoad() {
  }

  compartilhe() {
    this.socialSharing.share("Já conhece o Kesh? Faça suas compras e acumule $kesh. É só instalar o app a partir deste link", undefined, [""], "https://play.google.com");
  }

  abraTutorial() {

  }
}
