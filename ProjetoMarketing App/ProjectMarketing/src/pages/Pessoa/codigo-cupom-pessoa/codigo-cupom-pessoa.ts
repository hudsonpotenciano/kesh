import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { Cupom } from '../../../models/models.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-codigo-cupom-pessoa',
  templateUrl: 'codigo-cupom-pessoa.html',
})
export class CodigoCupomPessoaPage {

  codigo: string;
  idPessoa: number;

  constructor(public navCtrl: NavController,
    private utilitariosProvider: UtilitariosProvider,
    private events: Events,
    private transacaoProvider: TransacaoProvider,
    public navParams: NavParams) {
    this.idPessoa = this.navParams.get("idPessoa");
  }

  ionViewDidLoad() {
  }

  gerarCupomViaCodigo() {

    if (!this.codigo || this.codigo === "") {
      this.utilitariosProvider.mostreToast("Informe o código");
      return;
    }
    this.utilitariosProvider.mostreAlertaCarregando("Gerando cupom, aguarde um instante");
    if (this.idPessoa && this.idPessoa > 0) {
      this.transacaoProvider.GereCupomCompartilhamento(this.idPessoa, this.codigo)
        .then((resultado: Cupom) => {
          resultado;
          this.events.publish("atualizar-obtenhaTransacoes");
          this.navCtrl.pop();
          this.utilitariosProvider.removaAlertaCarregando();
          this.utilitariosProvider.mostreMensagemSucesso("Codigo compartilhado com sucesso, você receberá seu cupom assim que o seu codigo for utilizado.")
        })
        .catch((retorno) => {
          retorno;
          this.utilitariosProvider.removaAlertaCarregando();
          this.utilitariosProvider.mostreMensagemErro("Cupom inválido ou expirado")
        });
    }
    else {
      this.utilitariosProvider.mostreMensagemErro("Ocorreu um erro ao compartilhar, tente novamente.");
      this.navCtrl.pop();
    }
  }
}
