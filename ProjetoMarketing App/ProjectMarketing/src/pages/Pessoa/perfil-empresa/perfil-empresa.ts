import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa, PerfilEmpresa } from '../../../models/empresa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom, Venda } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageProvider } from '../../../providers/storage/storage';
import { TransacaoProvider } from '../../../providers/transacao/transacao';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {

  empresa: Empresa = new Empresa();
  perfilEmpresa: PerfilEmpresa = new PerfilEmpresa();
  cupons: Cupom[] = [];
  Vendas: Venda[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider,
    public pessoaProvider: PessoaProvider,
    public storage: StorageProvider,
    private transacaoProvider: TransacaoProvider) {
    this.empresaProvider;
  }

  ionViewDidLoad() {

    this.empresa = this.navParams.data;

    this.pessoaProvider.ObtenhaPerfilEmpresa(this.empresa.IdEmpresa)
      .then((retorno) => {
        this.perfilEmpresa = retorno;
      });

    this.transacaoProvider.ObtenhaCuponsEVendasEmpresa(this.empresa.IdEmpresa)
      .then((cuponsEVendas: any) => {
        this.cupons = cuponsEVendas.Cupons;
        this.Vendas = cuponsEVendas.Vendas;
      })
  }

  compartilhe() {
    this.transacaoProvider.GereCupom(this.empresa.IdEmpresa, this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((cupom: Cupom) => {

        this.transacaoProvider.GereVenda(cupom.Token, 100);

        this.storage.armazeneCupom(cupom);

        this.navCtrl.push("CupomPage", cupom);
      });
  }

  abraCupom(cupom: Cupom) {
    this.navCtrl.push("CupomPage", cupom);
  }
}