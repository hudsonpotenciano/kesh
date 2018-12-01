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

  cultura: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageProvider: StorageProvider,
    private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    this.cultura = this.storageProvider.recupereCultura();
  }

  compartilhe() {
    this.socialSharing.share("Já conhece o Kesh? Faça suas compras e ganhe dinheiro de volta. É só instalar o app a partir deste link e começar a ecominizar.", undefined, ["https://image.flaticon.com/icons/png/128/144/144041.png"], "https://play.google.com");
  }

  abraTutorial() {

  }
}
