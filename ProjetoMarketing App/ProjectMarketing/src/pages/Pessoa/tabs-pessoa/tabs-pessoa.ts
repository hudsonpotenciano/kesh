import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-pessoa',
  templateUrl: 'tabs-pessoa.html',
})
export class TabsPessoaPage {

  homePage: any = "HomePessoaPage";
  carteiraPage: any = "CarteiraPessoaPage";
  // mapsPessoaPage: any = "MapsPessoaPage";
  ConfiguracoesPessoaPage: any = "ConfiguracoesPessoaPage";
  transacoesPage: any = "TransacoesPage";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}