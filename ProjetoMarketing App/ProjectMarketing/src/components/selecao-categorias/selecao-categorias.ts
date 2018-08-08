import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { EnumeradorDeCategorias, Enumerador } from '../../models/enumeradores.model';


@IonicPage()
@Component({
  selector: 'page-selecao-categorias',
  templateUrl: 'selecao-categorias.html',
})
export class SelecaoCategoriasPage {

  categorias: Enumerador[] = new EnumeradorDeCategorias().obtenhaTodos();

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {

  }

  selecione(categoria: Enumerador) {
    this.viewCtrl.dismiss(categoria);
  }
}
