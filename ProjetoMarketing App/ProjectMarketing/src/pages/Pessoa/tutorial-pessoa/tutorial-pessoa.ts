import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial-pessoa',
  templateUrl: 'tutorial-pessoa.html',
})
export class TutorialPessoaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPessoaPage');
  }

  pessoa() {
    this.navCtrl.setRoot("LoginPessoaPage");
  }

  empresa() {
    this.navCtrl.setRoot("LoginEmpresaPage");
  }

}
