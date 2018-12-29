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
    this.utilitarios.mostreAlertaCarregando("Verificando se você pode compartilhar agora, aguarde um instante");
    this.podeCompartilhar()
      .then((pode: boolean) => {

        this.utilitarios.removaAlertaCarregando();

        if (!pode) return;

        var urlsImagems = [];
        this.empresa.Catalogo.forEach((catalogo) => {
          urlsImagems.push(this.empresaLojaProvider.obtenhaImagemCatalogo(catalogo.GuidImagem));
        });

        var guid6 = this.utilitarios.gereGuid6();
        var mensagemCompartilhamento = `Autilize este código *${guid6}* para ganhar o seu cupom e receber *$Keshs* na *${this.empresa.Empresa.Nome.trim()}* 🎁`;
        this.socialSharing.share(mensagemCompartilhamento, "teste", urlsImagems)
          .then(() => {

            this.transacaoProvider.gereCodigoDeCompartilhamento(this.empresa.Perfil.IdPerfilEmpresa,
              this.pessoaProvider.dadosAcesso.IdPessoa, guid6)
              .then(() => {
                this.utilitarios.mostreMensagemSucesso("Codigo compartilhado com sucesso, você receberá seu cupom assim que o seu codigo for utilizado.")
              })
              .catch(() => {
                this.utilitarios.mostreMensagemErro("Ocorreu um erro ao compartilhar, tente novamente.")
              })
          })
          .catch(() => {
            this.utilitarios.removaAlertaCarregando();
            this.utilitarios.mostreMensagemErro("Ocorreu um erro, tente novamente.")
          })
      })
      .catch(()=>{
        this.utilitarios.removaAlertaCarregando();
      });
  }

  podeCompartilhar() {
    this.compartilharHabilitado = false;

    return new Promise((resolve) => {
      if (!navigator.onLine) {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Conecte-se à internet para poder compartilhar");
        return false;
      }

      this.transacaoProvider.PessoaPodeCompartilhar(
        this.empresa.Perfil.IdPerfilEmpresa,
        this.empresa.PessoaEmpresa.IdPessoa)
        .then((podeCompartilhar: boolean) => {
          resolve(podeCompartilhar);
          if (!podeCompartilhar) {
            this.compartilharHabilitado = false;
            this.utilitarios.mostreMensagemErro("Você nao pode compartilhar agora pois possui um cupom válido para esta loja");
          }
        })
        .catch(() => {
          resolve(false);
          this.compartilharHabilitado = false;
        })
    });
  }
}
