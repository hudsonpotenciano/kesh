import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-pessoa',
  templateUrl: 'tabs-pessoa.html',
})
export class TabsPessoaPage {

  homePage: any = "HomePessoaPage";
  rootPage: any = "HomePessoaPage";

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
