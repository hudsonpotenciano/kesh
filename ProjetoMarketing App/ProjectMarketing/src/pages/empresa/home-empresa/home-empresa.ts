import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider) {
      this.empresaProvider;
  }

 
}
