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
  vendasAgrupadasAdminLoja: VendaAdminLoja[][] = [[]];
  estaCarregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private utilitarios: UtilitariosProvider,
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
       
        this.vendasAgrupadasAdminLoja = this.utilitarios
        .groupBy(retorno, function (item: VendaAdminLoja) {
          return [new Date(item.Venda.Data).toLocaleDateString()]
        }) as [VendaAdminLoja[]];

      }).catch(() => {
        this.utilitarios.removaAlertaCarregando();
      });
  }

  obtenhaCuponsEVendasEmpresaAdmin(refresh = undefined) {
    this.transacaoProvider.obtenhaCuponsEVendasEmpresaAdmin(this.dadosEmpresa.Empresa.IdEmpresa, refresh !== undefined)
      .then((retorno: VendaAdminLoja[]) => {
        
        this.vendasAgrupadasAdminLoja = this.utilitarios
        .groupBy(retorno, function (item: VendaAdminLoja) {
          return [new Date(item.Venda.Data).toLocaleDateString()]
        }) as [VendaAdminLoja[]];

        this.estaCarregando = false;
        this.utilitarios.removaAlertaCarregando();
        if (refresh)
          refresh.complete();
      }).catch(() => {
        this.utilitarios.removaAlertaCarregando();
        if (refresh)
          refresh.complete();
      });
  }

  obtenhaLogo() {
    return this.empresaProvider.obtenhaLogoEmpresa(this.dadosEmpresa.Empresa.IdEmpresa);
  }
}
