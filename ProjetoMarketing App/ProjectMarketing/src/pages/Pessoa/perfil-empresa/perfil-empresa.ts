import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { Empresa, PerfilEmpresa } from '../../../models/empresa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom, Venda } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { StorageTransacaoProvider } from '../../../providers/storage/storage-transacao';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { SocialSharing } from '../../../../node_modules/@ionic-native/social-sharing';
import { Pessoa } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {

  empresa: Empresa = new Empresa();
  podeCompartilhar = false;
  perfilEmpresa: PerfilEmpresa = new PerfilEmpresa();
  cupons: Cupom[] = [];
  Vendas: Venda[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider,
    public pessoaProvider: PessoaProvider,
    public storageTransacaoProvider: StorageTransacaoProvider,
    private transacaoProvider: TransacaoProvider,
    private storagePessoaProvider: StoragePessoaProvider,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private modalCtrl: ModalController) {

    this.empresaProvider;
    this.socialSharing;
  }

  ionViewDidLoad() {

    this.empresa = this.navParams.data;

    this.perfilEmpresa = this.storagePessoaProvider.recuperePerfilEmpresa(this.empresa.IdEmpresa);

    this.transacaoProvider.ObtenhaCuponsEVendasEmpresa(this.empresa.IdEmpresa)
      .then((cuponsEVendas: any) => {
        this.cupons = cuponsEVendas.Cupons;
        this.Vendas = cuponsEVendas.Vendas;
      });

    this.transacaoProvider.PessoaPodeCompartilhar(this.empresa.IdEmpresa,this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((podeCompartilhar: boolean) => {
        this.podeCompartilhar = podeCompartilhar;
      });
  }

  compartilhe() {
    // this.socialSharing.shareVia("whatsapp","teste")
    //   .then((teste) => {
    //     debugger;
    //     console.log(teste);

    //   }).catch((teste) => {
    //     debugger;
    //     console.log(teste);

    //   });
    // .then((teste) => {
    //   alert(teste + "deu");
    // }).catch((teste) => {
    //   alert(teste + "nao deu");
    // });

    // this.transacaoProvider.GereCupom(this.empresa.IdEmpresa, this.pessoaProvider.dadosAcesso.IdPessoa)
    //   .then((cupom: Cupom) => {

    //     this.transacaoProvider.GereVenda(cupom.Token, 100);

    //     this.storageTransacaoProvider.armazeneCupom(cupom);

    //     this.navCtrl.push("CupomPage", cupom);
    //   });

    let profileModal = this.modalCtrl.create("SelecaoPessoaCompartilhamentoPage", { idEmpresa: this.empresa.IdEmpresa });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();

    profileModal.onDidDismiss((pessoas: Pessoa[]) => {

      if (!pessoas) return;

      let idsPessoas = pessoas.map(p => p.IdPessoa);

      this.transacaoProvider
        .GereCupomCompartilhamento(this.empresa.IdEmpresa, this.pessoaProvider.dadosAcesso.IdPessoa, idsPessoas)
        .then(() => {

        });
    })
  }

  maps() {
    this.navCtrl.push("MapsPage", { latitude: this.empresa.Latitude, longitude: this.empresa.Longitude });
  }

  rota() {

    let destination = this.empresa.Latitude + ',' + this.empresa.Longitude;

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    }
    else if (this.platform.is('android')) {
      let label = encodeURI(this.empresa.Nome);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

  abraCupom(cupom: Cupom) {
    this.navCtrl.push("CupomPage", cupom);
  }
}