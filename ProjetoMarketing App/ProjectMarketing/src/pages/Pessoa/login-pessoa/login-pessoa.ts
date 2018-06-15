import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../../models/pessoa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';

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
        debugger;
        this.navCtrl.push("HomePessoaPage");
      })
  }

  abraCadastro() {
    this.navCtrl.push("CadastroPessoaPage");
  }
}
