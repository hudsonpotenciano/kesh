import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Empresa, PerfilEmpresa } from '../../../models/empresa.model';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Cupom } from '../../../models/models.model';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa',
  templateUrl: 'perfil-empresa.html',
})
export class PerfilEmpresaPage {

  empresa: Empresa = new Empresa();
  perfilEmpresa: PerfilEmpresa = new PerfilEmpresa();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider,
    public pessoaProvider: PessoaProvider) {

  }

  ionViewDidLoad() {

    this.empresa = this.navParams.data;

    this.pessoaProvider.ObtenhaPerfilEmpresa(this.empresa.IdEmpresa)
      .then((retorno) => {

        this.perfilEmpresa = retorno;
      });

  }

  compartilhe() {
    this.pessoaProvider.GereCupom(this.empresa.IdEmpresa, this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((cupom: Cupom) => {
        // this.pessoaProvider.GereVenda(cupom.Token, 100);
        this.navCtrl.push("CupomPage", cupom);
      });
  }
}