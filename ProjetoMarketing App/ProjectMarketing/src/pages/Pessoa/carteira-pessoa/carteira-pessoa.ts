import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { DTOCupomVenda } from '../../../models/models.model';
import { DadosPessoaEmpresa } from '../../../models/pessoa.model';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-carteira-pessoa',
  templateUrl: 'carteira-pessoa.html',
})
export class CarteiraPessoaPage {

  cuponsVendas: DTOCupomVenda[] = [];
  pessoasEmpresas: DadosPessoaEmpresa[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private transacaoProvider: TransacaoProvider,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private storagePessoa: StoragePessoaProvider) {

    this.pessoasEmpresas = this.storagePessoa.recupereDadosPessoaEmpresas();
    debugger;
  }

  ionViewDidLoad() {
    this.transacaoProvider.ObtenhaCuponsEVendasPessoa(this.pessoaProvider.dadosAcesso.IdPessoa)
      .then((resultado: any) => {
        this.cuponsVendas = resultado.CuponsVendas;
      })
  }

  abraQrCode(cupomVenda: DTOCupomVenda) {
    this.navCtrl.push("CupomPage", cupomVenda.Cupom);
  }

  obtenhaLogoEmpresa(idPerfilEmpresa: number) {

    var empresa = this.pessoasEmpresas.find(p => p.Perfil.IdPerfilEmpresa == idPerfilEmpresa);
    return this.empresaProvider.obtenhaLogoEmpresa(empresa.Empresa.IdEmpresa);
  }

}
