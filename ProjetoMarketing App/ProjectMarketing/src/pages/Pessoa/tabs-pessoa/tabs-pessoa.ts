import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-pessoa',
  templateUrl: 'tabs-pessoa.html',
})
export class TabsPessoaPage {

  @ViewChild('tabs') tabs: Tabs;

  homePage: any = "HomePessoaPage";
  carteiraPage: any = "CarteiraPessoaPage";
  // mapsPessoaPage: any = "MapsPessoaPage";
  ConfiguracoesPessoaPage: any = "ConfiguracoesPessoaPage";
  transacoesPage: any = "TransacoesPage";

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      if (sessionStorage.getItem("abriunotificacao") === "true") {
        debugger;
        this.tabs.select(2);
      }
    }, 1000);
  }
}