import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-empresa',
  templateUrl: 'tabs-empresa.html',
})
export class TabsEmpresaPage {

  homePage: any = "HomeEmpresaPage";
  opcoesEmpresaPage: any = "OpcoesEmpresaPage";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

}
