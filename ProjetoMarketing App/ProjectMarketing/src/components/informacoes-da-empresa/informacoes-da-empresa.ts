import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosEmpresaLoja } from '../../models/empresa.model';

@IonicPage()
@Component({
  selector: 'page-informacoes-da-empresa',
  templateUrl: 'informacoes-da-empresa.html',
})
export class InformacoesDaEmpresaPage {
  empresa: DadosEmpresaLoja;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.empresa = this.navParams.get("empresa");
  }

  ionViewDidLoad() {
  }
}
