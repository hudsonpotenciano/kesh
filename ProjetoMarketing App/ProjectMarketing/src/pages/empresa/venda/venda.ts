import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Cupom, Venda } from '../../../models/models.model';
import { TransacaoProvider } from '../../../providers/transacao/transacao';

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {

  cupom: Cupom;
  venda: Venda = new Venda();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider) {
    this.cupom = this.navParams.data;
  }

  ionViewDidLoad() {

  }

  realizeVenda() {
    this.transacaoProvider.GereVenda(this.cupom.Token, this.venda.Valor)
      .then(() => {

        this.navCtrl.pop();
        alert("venda gerada com sucesso!");

      }).catch(() => { });
  }
}
