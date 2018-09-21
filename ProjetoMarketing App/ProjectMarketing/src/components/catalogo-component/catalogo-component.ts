import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ImagemCatalogo } from '../../models/empresa.model';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';

@IonicPage()
@Component({
  selector: 'page-catalogo-component',
  templateUrl: 'catalogo-component.html',
})
export class CatalogoComponentPage {

  catalogo: ImagemCatalogo[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaLojaProvider;
    this.catalogo = this.navParams.get("catalogo");
  }

  ionViewDidLoad() {
  }

  voltar() {
    this.viewCtrl.dismiss();
  }
}
