import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-selecao-tipo-login-empresa',
  templateUrl: 'selecao-tipo-login-empresa.html',
})
export class SelecaoTipoLoginEmpresaPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  selecione(opcao: number) {
    this.viewCtrl.dismiss(opcao);
  }
}
