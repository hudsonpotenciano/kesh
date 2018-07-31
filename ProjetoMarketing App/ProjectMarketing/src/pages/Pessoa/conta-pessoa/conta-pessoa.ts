import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pessoa } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-conta-pessoa',
  templateUrl: 'conta-pessoa.html',
})
export class ContaPessoaPage {

  pessoa: Pessoa;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
