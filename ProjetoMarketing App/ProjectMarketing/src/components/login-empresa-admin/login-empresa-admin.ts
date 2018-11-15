import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { User } from '../../models/models.model';
import { EmpresaProvider } from '../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-login-empresa-admin',
  templateUrl: 'login-empresa-admin.html',
})
export class LoginEmpresaAdminPage {

  usuario: User = new User();

  constructor(
    private navParams: NavParams,
    public empresaProvider: EmpresaProvider) {
    this.usuario.Login = this.navParams.get("login");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginEmpresaAdminPage');
  }

  realizeLoginAdmin() {

  }
}
