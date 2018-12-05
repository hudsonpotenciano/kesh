import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DadosPessoaEmpresa } from '../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';

@IonicPage()
@Component({
  selector: 'page-preview-perfil-empresa',
  templateUrl: 'preview-perfil-empresa.html',
})
export class PreviewPerfilEmpresaPage {
  dadosPessoaEmpresa: DadosPessoaEmpresa;
  segment: string = "catalogo";
  
  constructor(public navCtrl: NavController,
    private empresaLojaProvider: EmpresaLojaProvider,
    public navParams: NavParams) {
    this.empresaLojaProvider;
    this.dadosPessoaEmpresa = this.navParams.get("dadosPessoaEmpresa");
  }

  ionViewDidLoad() {
  }

  abraPerfilEmpresa() {
    this.navCtrl.push("PerfilEmpresaPage", this.dadosPessoaEmpresa);
  }
}
