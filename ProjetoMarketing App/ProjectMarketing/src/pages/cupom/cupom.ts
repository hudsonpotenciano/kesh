import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cupom } from '../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-cupom',
  templateUrl: 'cupom.html',
})
export class CupomPage {

  cupom: Cupom;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cupom = this.navParams.data;
  }
}
