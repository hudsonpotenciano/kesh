import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Venda } from '../../../models/models.model';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { DTOCupomParaVenda } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {

  cupom: DTOCupomParaVenda;
  venda: Venda = new Venda();
  utilizarPontos: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider) {
    this.cupom = this.navParams.data;
  }

  realizeVenda() {
    debugger;
    if (this.utilizarPontos) {
      if (this.cupom.TotalDinheiroPessoa <= 0) {
        alert("pontos insuficientes");
        //melhorar mensagem
        return;
      }
    }

    this.transacaoProvider.GereVenda(this.cupom.Cupom.Token, this.venda.Valor, this.utilizarPontos)
      .then(() => {

        this.navCtrl.pop();
        alert("venda gerada com sucesso!");

      })
      .catch(() => { });
  }

}
