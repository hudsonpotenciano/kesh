import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private transacaoProvider: TransacaoProvider,
    public navParams: NavParams) {
    this.idPessoa = this.navParams.get("idPessoa");
  }

  ionViewDidLoad() {
  }

  gerarCupomViaCodigo() {
    if (this.idPessoa && this.idPessoa > 0) {
      this.transacaoProvider.GereCupomCompartilhamento(this.idPessoa, this.codigo)
        .then((resultado: Cupom) => {
          resultado;
          this.navCtrl.pop();
          this.utilitariosProvider.mostreMensagemSucesso("Codigo compartilhado com sucesso, você receberá seu cupom assim que o seu codigo for utilizado.")
        })
        .catch(() => {
          this.utilitariosProvider.mostreMensagemErro("Ocorreu um erro ao compartilhar, tente novamente.")
        })
    }
    else {
      this.utilitariosProvider.mostreMensagemErro("Ocorreu um erro, tente novamente.")
    }
  }
}
