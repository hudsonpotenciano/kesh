import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { Cupom } from '../../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-codigo-cupom-pessoa',
  templateUrl: 'codigo-cupom-pessoa.html',
})
export class CodigoCupomPessoaPage {

  codigo: string;
  idPessoa: number;

  constructor(public navCtrl: NavController,
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
          alert("cupom gerado com sucesso");
        })
        .catch(() => {
          alert("erro na geracao de cupom");
        })
    }
    else {
      alert("nao carregou o usuario");
    }
  }
}
