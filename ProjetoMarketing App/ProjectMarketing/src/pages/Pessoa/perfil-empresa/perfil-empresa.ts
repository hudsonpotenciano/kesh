import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, PopoverController, ModalController } from 'ionic-angular';
import { NotaComentarioPessoaEmpresa } from '../../../models/empresa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { StorageTransacaoProvider } from '../../../providers/storage/storage-transacao';
import { SocialSharing } from '../../../../node_modules/@ionic-native/social-sharing';
import { DadosPessoaEmpresa } from '../../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {
  dadosPessoaEmpresa: DadosPessoaEmpresa = new DadosPessoaEmpresa();
  notasComentariosPessoasEmpresas: NotaComentarioPessoaEmpresa[] = [];
  verMaisInformacoes = false;
  compartilharHabilitado = true;
  segment: string = "catalogo";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider,
    public pessoaProvider: PessoaProvider,
    public storageTransacaoProvider: StorageTransacaoProvider,
    private transacaoProvider: TransacaoProvider,
    private platform: Platform,
    private utilitarios: UtilitariosProvider,
    private socialSharing: SocialSharing,
    private storagePessoaProvider: StoragePessoaProvider,
    private popOverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaLojaProvider;
    this.empresaProvider;
    this.socialSharing;
    this.dadosPessoaEmpresa = this.navParams.data;
    this.popOverCtrl;
  }

  ionViewDidLoad() {
    this.dadosPessoaEmpresa = this.navParams.data;

    this.pessoaProvider.ObtenhaComentarioENotaPessoasEmpresas(this.dadosPessoaEmpresa.Perfil.IdPerfilEmpresa)
      .then((notasComentariosPessoasEmpresas: NotaComentarioPessoaEmpresa[]) => {
        this.notasComentariosPessoasEmpresas = notasComentariosPessoasEmpresas;
      });
  }

  compartilhe() {

    this.podeCompartilhar()
      .then((pode: boolean) => {
        if (!pode) return;

        var guid6 = this.utilitarios.gereGuid6();
        this.socialSharing.share("utiliza esse codigo aew " + guid6)
          .then(() => {

            this.transacaoProvider.gereCodigoDeCompartilhamento(this.dadosPessoaEmpresa.Perfil.IdPerfilEmpresa,
              this.pessoaProvider.dadosAcesso.IdPessoa,
              guid6)
              .then(() => {
                this.utilitarios.mostreMensagemSucesso("Codigo compartilhado com sucesso, você receberá seu cupom assim que o seu codigo for utilizado.")
              })
              .catch(() => {
                this.utilitarios.mostreMensagemErro("Ocorreu um erro ao compartilhar, tente novamente.")
              })
          })
          .catch(() => {
            this.utilitarios.mostreMensagemErro("Ocorreu um erro, tente novamente.")
          })
      });
  }

  maps() {

    this.navCtrl.push("MapsPage", { latitude: this.dadosPessoaEmpresa.Perfil.Latitude, longitude: this.dadosPessoaEmpresa.Perfil.Longitude });
  }

  rota() {

    let destination = this.dadosPessoaEmpresa.Perfil.Latitude + ',' + this.dadosPessoaEmpresa.Perfil.Longitude;

    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    }
    else if (this.platform.is('android')) {
      let label = encodeURI(this.dadosPessoaEmpresa.Perfil.Descricao);
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

  abraCupom(cupom: Cupom) {
    this.navCtrl.push("CupomPage", cupom);
  }

  abraPopoverCatalogo(evento) {
    let modal = this.modalCtrl.create("CatalogoComponentPage",
      { catalogo: this.dadosPessoaEmpresa.Catalogo },
      { cssClass: "popover-catalogo" });

    modal.present({ ev: evento });
  }

  podeCompartilhar() {
    this.compartilharHabilitado = false;

    return new Promise((resolve) => {
      if (!navigator.onLine) {
        alert("Conecte-se à internet para poder compartilhar");
        return false;
      }

      this.transacaoProvider.PessoaPodeCompartilhar(
        this.dadosPessoaEmpresa.Perfil.IdPerfilEmpresa,
        this.dadosPessoaEmpresa.PessoaEmpresa.IdPessoa)
        .then((podeCompartilhar: boolean) => {
          resolve(podeCompartilhar);
          if (!podeCompartilhar) {
            this.compartilharHabilitado = false;
            this.utilitarios.mostreToast("Voce nao pode compartilhar agora pois possui um cupom válido para esta loja");
          }
        })
        .catch(() => {
          resolve(false);
          this.utilitarios.mostreToastTenteNovamente();
        })
    });
  }

  verInformacoesDaLoja() {

  }

  abraPopoverAvaliacao() {
    let popover = this.popOverCtrl.create("AvaliacaoLojaComponent",
      {
        nota: this.dadosPessoaEmpresa.PessoaEmpresa.Nota,
        comentario: this.dadosPessoaEmpresa.PessoaEmpresa.Comentario
      },
      { cssClass: "popover-avaliacao popover-shadow" });

    popover.present();
    popover.onDidDismiss((retorno: any) => {

      if (!retorno || (retorno.Nota == 0 || retorno.Comentario === ""))
        return;

      this.pessoaProvider.atualizeDadosPessoaEmpresa(this.dadosPessoaEmpresa.Perfil.IdPerfilEmpresa,
        retorno.Comentario,
        retorno.Nota)
        .then(() => {
          this.dadosPessoaEmpresa.PessoaEmpresa.Comentario = retorno.Comentario;
          this.dadosPessoaEmpresa.PessoaEmpresa.Nota = retorno.Nota;
          this.storagePessoaProvider.atualizeDadosPessoaEmpresa(this.dadosPessoaEmpresa);
          this.utilitarios.mostreMensagemSucesso("Avaliado com sucesso");
        }).catch(() => {
        });
    });
  }
}