import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Perfil } from '../../models/empresa.model';

@IonicPage()
@Component({
  selector: 'page-selecao-perfis-empresa',
  templateUrl: 'selecao-perfis-empresa.html',
})
export class SelecaoPerfisEmpresaPage {

  perfis: Perfil[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController) {
      
      this.perfis = this.navParams.get("perfis");
  }

  ionViewDidLoad() {
  }

  selecione(perfil: Perfil) {
    this.viewCtrl.dismiss(perfil);
  }

}
