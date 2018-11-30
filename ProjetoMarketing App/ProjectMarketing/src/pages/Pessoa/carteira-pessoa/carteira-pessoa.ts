import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { DadosPessoaEmpresa, PessoaLoja } from '../../../models/pessoa.model';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-carteira-pessoa',
  templateUrl: 'carteira-pessoa.html',
})
export class CarteiraPessoaPage {

  pessoaLojas: PessoaLoja[] = [];
  pessoasEmpresas: DadosPessoaEmpresa[];
  estaCarregando = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private storagePessoa: StoragePessoaProvider) {

    this.pessoasEmpresas = this.storagePessoa.recupereDadosPessoaEmpresas();
  }

  ionViewDidLoad() {
    this.pessoaProvider.obtenhaDadosPessoaLojas()
      .then((resultado: any) => {
        this.pessoaLojas = resultado;
        this.estaCarregando = false;
      })
      .catch(() => {

      })
  }

  obtenhaLogoEmpresa(idEmpresa: number) {

    return this.empresaProvider.obtenhaLogoEmpresa(idEmpresa);
  }
}