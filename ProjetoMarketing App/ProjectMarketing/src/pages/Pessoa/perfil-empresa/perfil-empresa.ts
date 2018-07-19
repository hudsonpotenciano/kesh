import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { Empresa, PerfilEmpresa, NotaComentarioPessoaEmpresa } from '../../../models/empresa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom, Venda } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { StorageTransacaoProvider } from '../../../providers/storage/storage-transacao';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { SocialSharing } from '../../../../node_modules/@ionic-native/social-sharing';
import { Pessoa, PessoaEmpresa } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {

  empresa: Empresa = new Empresa();
  podeCompartilhar = false;
  perfilEmpresa: PerfilEmpresa = new PerfilEmpresa();
  pessoaEmpresa: PessoaEmpresa = new PessoaEmpresa();
  notasComentariosPessoasEmpresas: NotaComentarioPessoaEmpresa[] = [];
  cupons: Cupom[] = [];
  vendas: Venda[] = [];

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
    this.pessoaEmpresa = this.storagePessoaProvider.recuperePessoaEmpresa(this.empresa.IdEmpresa);

    this.transacaoProvider.ObtenhaCuponsEVendasEmpresa(this.empresa.IdEmpresa)
      .then((cuponsEVendas: any) => {
        this.cupons = cuponsEVendas.Cupons;
        this.vendas = cuponsEVendas.Vendas;
      });

    this.transacaoProvider.PessoaPodeCompartilhar(this.empresa.IdEmpresa, this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((podeCompartilhar: boolean) => {
        this.podeCompartilhar = podeCompartilhar;
      });

    this.pessoaProvider.ObtenhaComentarioENotaPessoasEmpresas(this.empresa.IdEmpresa)
      .then((notasComentariosPessoasEmpresas: NotaComentarioPessoaEmpresa[]) => {
        debugger;
        this.notasComentariosPessoasEmpresas = notasComentariosPessoasEmpresas;
      });
  }

  atualizeDadosPessoaEmpresa() {

    this.pessoaProvider.atualizeDadosPessoaEmpresa(this.empresa.IdEmpresa,
      this.pessoaEmpresa.Comentario,
      this.pessoaEmpresa.Nota)
      .then(() => {

        this.storagePessoaProvider.atualizePessoaEmpresa(this.pessoaEmpresa);
      });
  }

  compartilhe() {

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
          this.podeCompartilhar = false;
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