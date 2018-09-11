import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { TransacaoProvider } from '../../../providers/transacao/transacao';
import { DTOCupomVenda } from '../../../models/models.model';
import { DadosPessoaEmpresa } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-transacoes',
  templateUrl: 'transacoes.html',
})
export class TransacoesPage {
  
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
