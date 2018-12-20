import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
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

  constructor(private empresaLojaProvider: EmpresaLojaProvider,
    private app: App,
    public navParams: NavParams) {
    this.empresaLojaProvider;
    this.dadosPessoaEmpresa = this.navParams.get("dadosPessoaEmpresa");
  }

  ionViewDidLoad() {
  }

  abraPerfilEmpresa() {
    this.app.getRootNavs()[0].push("PerfilEmpresaPage", this.dadosPessoaEmpresa);
  }
}
