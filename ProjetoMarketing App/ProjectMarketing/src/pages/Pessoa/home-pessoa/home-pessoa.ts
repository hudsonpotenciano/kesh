import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosPessoaEmpresa, Pessoa } from '../../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';

@IonicPage()
@Component({
  selector: 'page-home-pessoa',
  templateUrl: 'home-pessoa.html',
})

export class HomePessoaPage {

  pessoaEmpresas: DadosPessoaEmpresa[] = [];
  pessoa: Pessoa;
  fakeItens: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaProvider;
    this.empresaLojaProvider;

    for (let i = 0; i < 30; i++) {
      this.fakeItens[i] = i;
    }
  }

  ionViewDidEnter() {
    
    this.obtenhaEmpresas();

    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
      })
  }

  obtenhaEmpresas() {
    this.pessoaProvider.obtenhaPessoaEPerfilEmpresas()
      .then((retorno: DadosPessoaEmpresa[]) => {
        this.pessoaEmpresas = retorno;
        this.fakeItens = null;
      })
  }

  abraPerfilEmpresa(pessoaEmpresa: DadosPessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", pessoaEmpresa);
  }

  obtenhaArrayNota(nota){
    if(!nota)return [];
    return Array(nota);
  }
}
