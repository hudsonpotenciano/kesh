import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginEmpresaProvider } from '../../../providers/empresa/login';
import { User } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-login-empresa',
  templateUrl: 'login-empresa.html',
})
export class LoginEmpresaPage {

  usuario: User = new User();

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private loginProvider : LoginEmpresaProvider) {
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
    this.navCtrl.push("CadastroEmpresaPage");
  }
}
