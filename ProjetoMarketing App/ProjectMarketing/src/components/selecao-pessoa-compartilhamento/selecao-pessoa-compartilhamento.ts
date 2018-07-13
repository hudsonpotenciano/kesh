import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { PessoaProvider } from '../../providers/pessoa/pessoa';
import { Pessoa } from '../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-selecao-pessoa-compartilhamento',
  templateUrl: 'selecao-pessoa-compartilhamento.html',
})
export class SelecaoPessoaCompartilhamentoPage {

  pessoas: Pessoa[] = [];
  pessoasSelecionadas: Pessoa[] = [];

  constructor(public viewCtrl: ViewController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider) {
  }

  ionViewDidLoad() {
    this.pessoaProvider.ObtenhaPessoasCompartilhamento(this.navParams.get('idEmpresa'))
      .then((pessoas: Pessoa[]) => {
        console.log(pessoas);
        this.pessoas = pessoas;
      });
  }

  selecione(pessoa: Pessoa) {
    if (this.pessoasSelecionadas.find(p => p.IdPessoa == pessoa.IdPessoa))
      this.pessoasSelecionadas = this.pessoasSelecionadas.filter(p => p.IdPessoa != pessoa.IdPessoa);
    else
      this.pessoasSelecionadas.push(pessoa);
  }

  estaSelecionado(pessoa: Pessoa) {
    return this.pessoasSelecionadas.find(p => p.IdPessoa == pessoa.IdPessoa);
  }

  retorneSelecionados() {
    this.viewCtrl.dismiss(this.pessoasSelecionadas);
  }
}
