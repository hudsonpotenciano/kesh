import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Cupom, VendaPessoa } from '../../../models/models.model';
import { DadosEmpresaLoja } from '../../../models/empresa.model';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';

@IonicPage()
@Component({
  selector: 'page-home-empresa-loja',
  templateUrl: 'home-empresa-loja.html',
})
export class HomeEmpresaLojaPage {

  dadosEmpresa: DadosEmpresaLoja;
  vendas: VendaPessoa[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public empresaLojaProvider: EmpresaLojaProvider,
    public modalCtrl: ModalController,
    private transacaoProvider: TransacaoProvider,
    private pessoaProvider: PessoaProvider) {
    this.pessoaProvider;
  }

  ionViewDidLoad() {
    this.obtenhaEmpresa();
  }

  obtenhaEmpresa() {
    this.empresaLojaProvider.obtenhaDadosEmpresaLoja()
      .then((retorno: DadosEmpresaLoja) => {
        this.dadosEmpresa = retorno;
        this.obtenhaCuponsEVendas();
      });
  }

  obtenhaCuponsEVendas() {
    this.transacaoProvider.ObtenhaCuponsEVendasEmpresa(this.dadosEmpresa.Perfil.IdPerfilEmpresa)
      .then((cuponsEVendas: any) => {
        this.vendas = cuponsEVendas.Vendas;
      });
  }

  valideCupomVenda() {
    var modal = this.modalCtrl.create("QrCodeScannerPage");
    modal.present();

    modal.onDidDismiss((cupom: Cupom) => {
      if (!cupom) return;

      this.navCtrl.push("VendaPage", cupom);

    });
  }
}
