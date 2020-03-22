import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { DadosPessoaEmpresa, PessoaLoja } from '../../../models/pessoa.model';
import { StoragePessoaProvider } from '../../../providers/storage/storage-pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { Perfil } from '../../../models/empresa.model';

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

  ionViewDidEnter() {
    this.obtenhaDados();
  }

  obtenhaDados(refresh = undefined) {
    this.pessoaProvider.obtenhaDadosPessoaLojas(refresh !== undefined)
      .then((resultado: PessoaLoja[]) => {

        resultado.push({
          NomeEmpresa: "Kesh",
          Loja: {
            Descricao: "Kesh apresentação",
            IdEmpresa: "809ee4ae-1748-49ed-b412-a597f05e65c9",
            IdPerfilEmpresa: "3bfc170f-218c-4385-b45d-5ed2aaa366be",
          } as Perfil,
          Pontos: 50,
          PontosEmDinheiro: 10
        })

        this.pessoaLojas = resultado;
        this.pessoaLojas.sort(a => a.Pontos);
        this.estaCarregando = false;
        if (refresh)
          refresh.complete();
      })
      .catch((retorno) => {
        retorno;
        if (refresh)
          refresh.complete();
      });
  }

  obtenhaLogoEmpresa(idEmpresa: string) {

    return this.empresaProvider.obtenhaLogoEmpresa(idEmpresa);
  }
}