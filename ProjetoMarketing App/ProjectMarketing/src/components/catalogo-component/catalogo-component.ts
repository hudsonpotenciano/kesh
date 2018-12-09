import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';
import { DadosPessoaEmpresa } from '../../models/pessoa.model';
import { TransacaoProvider } from '../../providers/transacao/transacao';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-catalogo-component',
  templateUrl: 'catalogo-component.html',
})
export class CatalogoComponentPage {

  empresa: DadosPessoaEmpresa;
  compartilharHabilitado = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private transacaoProvider: TransacaoProvider,
    private utilitarios: UtilitariosProvider,
    private socialSharing:SocialSharing,
    private pessoaProvider: PessoaProvider,
    private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaLojaProvider;
    this.empresa = this.navParams.get("empresa");
  }

  ionViewDidLoad() {
  }

  voltar() {
    this.viewCtrl.dismiss();
  }

  compartilhe() {

    this.podeCompartilhar()
      .then((pode: boolean) => {
        if (!pode) return;

        var guid6 = this.utilitarios.gereGuid6();
        this.socialSharing.share("utiliza esse codigo aew " + guid6)
          .then(() => {

            this.transacaoProvider.gereCodigoDeCompartilhamento(this.empresa.Perfil.IdPerfilEmpresa,
              this.pessoaProvider.dadosAcesso.IdPessoa,
              guid6)
              .then(() => {
                alert("Voce será avisado quando receber seu cupom");
              })
              .catch(() => {

              })
          })
          .catch(() => {

          })
      });
  }

  podeCompartilhar() {
    this.compartilharHabilitado = false;

    return new Promise((resolve) => {
      if (!navigator.onLine) {
        alert("Conecte-se à internet para poder compartilhar");
        return false;
      }

      this.transacaoProvider.PessoaPodeCompartilhar(
        this.empresa.Perfil.IdPerfilEmpresa,
        this.empresa.PessoaEmpresa.IdPessoa)
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
}
