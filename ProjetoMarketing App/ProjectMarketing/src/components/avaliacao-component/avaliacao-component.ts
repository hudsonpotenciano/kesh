import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-avaliacao-component',
  templateUrl: 'avaliacao-component.html',
})
export class AvaliacaoComponentPage {

  comentario: string;
  nota: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  salvar(){
    
  }
}
