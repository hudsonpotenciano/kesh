import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-introducao',
  templateUrl: 'introducao.html',
})
export class IntroducaoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  pessoa() {
    this.navCtrl.setRoot("LoginPessoaPage");
  }

  empresa() {
    this.navCtrl.setRoot("LoginEmpresaPage");
  }
}
