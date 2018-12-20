import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Pessoa } from '../../../models/pessoa.model';


@IonicPage()
@Component({
  selector: 'page-perfil-pessoa',
  templateUrl: 'perfil-pessoa.html',
})
export class PerfilPessoaPage {
  pessoa: Pessoa = { Nome: "", Email: "" } as Pessoa;

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

  obtenhaFotoPessoa() {
    return this.pessoaProvider.obtenhaFotoPessoa(this.pessoa.IdPessoa);
  }

  salvar() {

  }

  voltar() {
    this.navCtrl.pop();
  }
}