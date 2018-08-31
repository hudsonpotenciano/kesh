import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom, Venda } from '../../../models/models.model';
import { DadosPessoaEmpresa } from '../../../models/pessoa.model';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';

@IonicPage()
@Component({
  selector: 'page-carteira-pessoa',
  templateUrl: 'carteira-pessoa.html',
})
export class CarteiraPessoaPage {

  cupons: Cupom[] = [];
  Vendas: Venda[] = [];
  pessoasEmpresas: DadosPessoaEmpresa[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider,
    private pessoaProvider: PessoaProvider,
    private storagePessoa: StoragePessoaProvider) {

    this.pessoasEmpresas = this.storagePessoa.recupereDadosPessoaEmpresas();
    debugger;
  }

  ionViewDidLoad() {
    this.transacaoProvider.ObtenhaCuponsEVendasPessoa(this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((cuponsEVendas: any) => {
        this.cupons = cuponsEVendas.Cupons;
        this.Vendas = cuponsEVendas.Vendas;
      })
  }

}
