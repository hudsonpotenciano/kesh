import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosEmpresaAdmin, VendaAdminLoja } from '../../../models/empresa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-home-empresa',
  templateUrl: 'home-empresa.html',
})
export class HomeEmpresaPage {

  dadosEmpresa: DadosEmpresaAdmin;
  vendasAdminLoja: VendaAdminLoja[];
  estaCarregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private utilitarios:UtilitariosProvider,
    public empresaProvider: EmpresaProvider,
    public empresaLojaProvider: EmpresaLojaProvider,
    public transacaoProvider: TransacaoProvider) {
    this.empresaProvider;
  }
  ionViewDidLoad() {
    this.obtenhaEmpresa();
  }

  obtenhaEmpresa() {
    this.utilitarios.mostreAlertaCarregando("Buscando vendas de todas as lojas, aguarde um instante.");
    this.empresaProvider.obtenhaDadosEmpresaAdmin()
      .then((retorno: DadosEmpresaAdmin) => {
        this.dadosEmpresa = retorno;
        this.obtenhaCuponsEVendasEmpresaAdmin();
        alert("terminou 1");
      }).catch(() => {
        this.vendasAdminLoja = [];
        this.utilitarios.removaAlertaCarregando();
      });
  }

  obtenhaCuponsEVendasEmpresaAdmin() {
    this.transacaoProvider.obtenhaCuponsEVendasEmpresaAdmin(this.dadosEmpresa.Empresa.IdEmpresa)
      .then((retorno: VendaAdminLoja[]) => {
        this.vendasAdminLoja = retorno;
        this.estaCarregando = false;
        alert("terminou 2");
        this.utilitarios.removaAlertaCarregando();
      }).catch(() => {
        this.vendasAdminLoja = [];
        this.utilitarios.removaAlertaCarregando();
      });
  }

  obtenhaLogo() {
    return this.empresaProvider.obtenhaLogoEmpresa(this.dadosEmpresa.Empresa.IdEmpresa);
  }
}
