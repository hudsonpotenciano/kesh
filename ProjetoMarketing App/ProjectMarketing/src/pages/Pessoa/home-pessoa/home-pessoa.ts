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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider) {
    this.empresaProvider;
  }

  ionViewDidLoad() {
    this.obtenhaEmpresas();
  }

  ionViewDidEnter() {
    
  }

  obtenhaEmpresas() {
    this.pessoaProvider.ObtenhaPessoaEPerfilEmpresas()
      .then((retorno: PessoaEmpresa[]) => {
        this.pessoaEmpresas = retorno;
      })
  }

  abraPerfilEmpresa(empresa: PessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", empresa.Empresa);
  }
}
