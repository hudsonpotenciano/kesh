import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover-informacao',
  templateUrl: 'popover-informacao.html',
})
export class PopoverInformacaoPage {

  texto: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.texto = this.navParams.data
  }
}
