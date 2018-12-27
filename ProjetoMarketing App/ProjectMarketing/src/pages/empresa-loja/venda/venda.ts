import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Venda } from '../../../models/models.model';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { DTOCupomParaVenda } from '../../../models/pessoa.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-venda',
  templateUrl: 'venda.html',
})
export class VendaPage {

  cupom: DTOCupomParaVenda;
  venda: Venda = new Venda();
  valor: number = 0;
  utilizarPontos: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private events: Events,
    private utilitarios: UtilitariosProvider,
    private transacaoProvider: TransacaoProvider) {
    this.cupom = this.navParams.data;
  }

  realizeVenda() {

    if (this.utilizarPontos) {
      if (this.cupom.TotalDinheiroPessoa <= 0) {
        this.utilitarios.mostreMensagemErro("Keshs insuficientes");
        //melhorar mensagem
        return;
      }
    }
    
    if(this.valor <= 0){
      this.utilitarios.mostreMensagemErro("Informe um valor maior que zero");
      return;
    }
    
    this.transacaoProvider.GereVenda(this.cupom.Cupom.Token, this.valor, this.utilizarPontos)
      .then(() => {
        this.events.publish("atualizar-obtenhaCuponsEVendas");
        this.navCtrl.pop();
        this.utilitarios.mostreMensagemSucesso("Venda gerada com sucesso");
      })
      .catch(() => {
        this.utilitarios.mostreMensagemSucesso("Não foi possível gerar esta venda, por favor verifique os dados e tente novamente");
      });
  }

  voltar() {
    this.navCtrl.pop();
  }
}
