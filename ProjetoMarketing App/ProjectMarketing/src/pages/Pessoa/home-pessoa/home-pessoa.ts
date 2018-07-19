import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PessoaEmpresa } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-home-pessoa',
  templateUrl: 'home-pessoa.html',
})

export class HomePessoaPage {

  pessoaEmpresas: PessoaEmpresa[] = [];
  fakeItens: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider) {
    this.empresaProvider;

    for (let i = 0; i < 30; i++) {
      this.fakeItens[i] = i;
    }
  }

  ionViewDidEnter() {
    this.obtenhaEmpresas();
  }

  obtenhaEmpresas() {
    this.pessoaProvider.obtenhaPessoaEPerfilEmpresas()
      .then((retorno: PessoaEmpresa[]) => {
        this.pessoaEmpresas = retorno;
        this.fakeItens = null;
      })
  }

  abraPerfilEmpresa(empresa: PessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", empresa.Empresa);
  }
}
