import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Perfil } from '../../models/empresa.model';
import { EmpresaProvider } from '../../providers/empresa/empresa';


@IonicPage()
@Component({
  selector: 'page-selecao-perfis-empresa',
  templateUrl: 'selecao-perfis-empresa.html',
})
export class SelecaoPerfisEmpresaPage {

  perfis: Perfil[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private empresaProvider: EmpresaProvider) {

  }

  ionViewDidLoad() {
    this.empresaProvider.obtenhaPerfisEmpresa()
      .then((perfis: Perfil[]) => {
        this.perfis = perfis;
      })
  }

  selecione(perfil: Perfil) {
    this.viewCtrl.dismiss(perfil);
  }

}
