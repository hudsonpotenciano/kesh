import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { User } from '../../../models/models.model';

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
    private empresaProvider : EmpresaProvider) {
  }

  ionViewDidLoad() {
  }
  
  login() {

    this.empresaProvider.realizeLogin(this.usuario)
      .then(() => {
        debugger;
        this.navCtrl.push("HomePage");
      })
  }
  
  abraCadastro() {
    this.navCtrl.push("CadastroEmpresaPage");
  }
}
