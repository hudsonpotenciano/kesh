import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, InfiniteScroll } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { DadosPessoaEmpresa, Pessoa } from '../../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { Localizacao } from '../../../models/models.model';
import { Geolocation } from '@ionic-native/geolocation';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-home-pessoa',
  templateUrl: 'home-pessoa.html',
})

export class HomePessoaPage {

  pessoaEmpresas: DadosPessoaEmpresa[] = [];
  pessoaEmpresasLimit: DadosPessoaEmpresa[] = [];
  pessoa: Pessoa;
  mostrarPesquisa: boolean = false;
  estaCarregando = true;
  pagina = 1;
  minhaLocalizacao: Localizacao;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private empresaProvider: EmpresaProvider,
    private platform: Platform,
    private utilitarios: UtilitariosProvider,
    private empresaLojaProvider: EmpresaLojaProvider,
    private geolocation: Geolocation) {
    this.empresaProvider;
    this.empresaLojaProvider;
  }

  ionViewDidLoad() {

    this.obtenhaEmpresas();

    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;

        this.estaCarregando = false
      });
  }

  obtenhaEmpresas() {
    this.obtenhaLocalizacaoAtual()
      .then((localizacao) => {
        this.minhaLocalizacao = localizacao;
        this.pessoaProvider.obtenhaPessoaEPerfilEmpresas(localizacao, this.pagina, 20)
          .then((retorno: DadosPessoaEmpresa[]) => {
            this.pessoaEmpresas = retorno;
            this.pessoaEmpresasLimit = this.utilitarios.pagine(retorno, this.pagina, 20);
            this.pagina++;
          });
      });
  }

  abraPerfilEmpresa(pessoaEmpresa: DadosPessoaEmpresa) {
    this.navCtrl.push("PerfilEmpresaPage", pessoaEmpresa);
  }

  obtenhaFotoPessoa() {
    return this.pessoaProvider.obtenhaFotoPessoa(this.pessoa.IdPessoa);
  }

  obtenhaLocalizacaoAtual() {

    // if (this.platform.is("cordova")) {
    //   return new Promise<Localizacao>((resolve) => {
    //     this.geolocation.getCurrentPosition()
    //       .then((resp) => {
    //         resolve(new Localizacao(resp.coords.latitude, resp.coords.longitude));
    //         alert("peguei a localizacao");
    //       })
    //       .catch((error) => {
    //         alert("Erro ao obter localização atual");
    //         console.log(error);
    //       });
    //   });
    // }
    // else {
    this.platform;
    this.geolocation;
    return Promise.resolve(new Localizacao(-16.7064275, -49.2078104));
    // }
  }

  mostrePerfilPessoaModal() {
    this.navCtrl.push("PerfilPessoaPage");
  }

  doInfinite(infinit: InfiniteScroll): Promise<any> {
    return new Promise((resolve) => {
      
      this.pessoaEmpresasLimit = this.pessoaEmpresasLimit
      .concat(this.utilitarios.pagine(this.pessoaEmpresas, this.pagina, 20));

      this.pagina++;
      resolve();
      infinit.complete();
    });
  }
}
