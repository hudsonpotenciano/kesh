import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { User } from '../../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-login-pessoa',
  templateUrl: 'login-pessoa.html',
})

export class LoginPessoaPage {

  usuario: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pessoaProvider: PessoaProvider) {
  }

  ionViewDidLoad() {
  }

  login() {

    this.pessoaProvider.realizeLogin(this.usuario)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      })
  }

  abraCadastro() {
    this.navCtrl.push("CadastroPessoaPage");
  }
}
