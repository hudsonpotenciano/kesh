import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-empresa-loja',
  templateUrl: 'tabs-empresa-loja.html',
})

export class TabsEmpresaLojaPage {

  homePage: any = "HomeEmpresaLojaPage";
  opcoesPage: any = "OpcoesEmpresaLojaPage";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
