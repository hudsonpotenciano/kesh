import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { Pessoa } from '../../models/pessoa.model';


@IonicPage()
@Component({
  selector: 'page-perfil-pessoa-modal',
  templateUrl: 'perfil-pessoa-modal.html',
})
export class PerfilPessoaModalPage {
  pessoa: Pessoa;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider) {
  }

  ionViewDidLoad() {
    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa) => {
        this.pessoa = pessoa;
      })
  }

}
