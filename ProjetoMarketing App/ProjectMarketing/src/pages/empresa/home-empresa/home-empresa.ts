import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosEmpresaAdmin, VendaAdminLoja } from '../../../models/empresa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { TransacaoProvider } from '../../../providers/transacao/transacao';

@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {

  dadosEmpresa: DadosEmpresaAdmin;
  vendasAdminLoja: VendaAdminLoja[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empresaProvider: EmpresaProvider,
    public empresaLojaProvider: EmpresaLojaProvider,
    public transacaoProvider: TransacaoProvider) {
    this.empresaProvider;
  }
  ionViewDidLoad() {
    this.obtenhaEmpresa();
  }

  obtenhaEmpresa() {
    this.empresaProvider.obtenhaDadosEmpresaAdmin()
      .then((retorno: DadosEmpresaAdmin) => {
        this.dadosEmpresa = retorno;
        this.obtenhaCuponsEVendasEmpresaAdmin();
      });
  }

  obtenhaCuponsEVendasEmpresaAdmin() {
    this.transacaoProvider.obtenhaCuponsEVendasEmpresaAdmin(this.dadosEmpresa.Empresa.IdEmpresa)
      .then((retorno: VendaAdminLoja[]) => {
        this.vendasAdminLoja = retorno;
      });
  }

  obtenhaLogo(){
    return this.empresaProvider.obtenhaLogoEmpresa(this.dadosEmpresa.Empresa.IdEmpresa);
  }
}
