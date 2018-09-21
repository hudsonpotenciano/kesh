import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosPessoaEmpresa, Pessoa } from '../../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { Localizacao } from '../../../models/models.model';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-home-pessoa',
  templateUrl: 'home-pessoa.html',
})

export class HomePessoaPage {

  pessoaEmpresas: DadosPessoaEmpresa[] = [];
  pessoa: Pessoa;
  fakeItens: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private empresaLojaProvider: EmpresaLojaProvider,
    private geolocation: Geolocation) {
    this.empresaProvider;
    this.empresaLojaProvider;

    for (let i = 0; i < 30; i++) {
      this.fakeItens[i] = i;
    }
  }

  ionViewDidEnter() {

    this.obtenhaEmpresas();

    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
      })
  }

  obtenhaEmpresas() {
    this.obtenhaLocalizacaoAtual()
      .then((localizacao) => {
        debugger;
        this.pessoaProvider.obtenhaPessoaEPerfilEmpresas(localizacao)
          .then((retorno: DadosPessoaEmpresa[]) => {
            this.pessoaEmpresas = retorno;
            this.fakeItens = null;
          });
      });
  }

  abraPerfilEmpresa(pessoaEmpresa: DadosPessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", pessoaEmpresa);
  }


  obtenhaLocalizacaoAtual() {
    return new Promise<Localizacao>((resolve) => {
      // this.geolocation.getCurrentPosition().then((resp) => {
      //   resolve(new Localizacao(resp.coords.latitude, resp.coords.longitude));
      // }).catch((error) => {
      //   alert("Erro ao obter localização atual");
      //   console.log(error);
      // });
      this.geolocation;
      // resolve(new Localizacao(-16.7064275, -49.2078104));
      resolve(new Localizacao(-16.7932397, -49.1366568));      
    });


  }
}
