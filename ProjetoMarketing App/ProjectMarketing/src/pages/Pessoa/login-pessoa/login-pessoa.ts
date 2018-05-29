import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPessoaProvider } from '../../../providers/pessoa/login';
import { User } from '../../../models/pessoa.model';

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
    public loginProvider: LoginPessoaProvider) {
  }

  ionViewDidLoad() {
  }

  login() {

    this.loginProvider.realizeLogin(this.usuario)
      .then(() => {
        debugger;
        this.navCtrl.push("HomePage");
      })
  }

  abraCadastro() {
    this.navCtrl.push("CadastroPessoaPage");
  }
}
