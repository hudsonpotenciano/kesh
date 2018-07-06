import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom, Venda } from '../../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-carteira-pessoa',
  templateUrl: 'carteira-pessoa.html',
})
export class CarteiraPessoaPage {

  cupons: Cupom[] = [];
  Vendas: Venda[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider,
    private pessoaProvider: PessoaProvider) {
  }

  ionViewDidLoad() {
    this.transacaoProvider.ObtenhaCuponsEVendasPessoa(this.pessoaProvider.dadosAcesso.IdPessoa)
    .then((cuponsEVendas: any) => {
      this.cupons = cuponsEVendas.Cupons;
      this.Vendas = cuponsEVendas.Vendas;
    })
  }

}
