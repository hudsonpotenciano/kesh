import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-configuracoes-pessoa',
  templateUrl: 'configuracoes-pessoa.html',
})
export class ConfiguracoesPessoaPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
  }

  compartilhe() {
    this.socialSharing.share("Já conhece o Mytrade? Faça suas compras e ganhe dinheiro de volta. É só instalar o app a partir deste link e começar a ecominizar.", undefined, ["https://image.flaticon.com/icons/png/128/144/144041.png"], "https://play.google.com");
  }

  abraTutorial() {

  }
}
