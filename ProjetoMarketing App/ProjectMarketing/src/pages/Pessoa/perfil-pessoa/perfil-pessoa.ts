import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Pessoa } from '../../../models/pessoa.model';
import { StorageProvider } from '../../../providers/storage/storage';
import { SplashScreen } from '@ionic-native/splash-screen';


@IonicPage()
@Component({
  selector: 'page-perfil-pessoa',
  templateUrl: 'perfil-pessoa.html',
})
export class PerfilPessoaPage {
  pessoa: Pessoa = { Nome: "", Email: "" } as Pessoa;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private splashScreen : SplashScreen,
    private pessoaProvider: PessoaProvider,
    private storage: StorageProvider) {
  }

  ionViewDidLoad() {
    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa) => {
        this.pessoa = pessoa;
      })
  }

  obtenhaFotoPessoa() {
    return this.pessoaProvider.obtenhaFotoPessoa(this.pessoa.IdPessoa);
  }

  mudarSenha() {

  }

  sair() {
    this.storage.limpeTudo();
    this.splashScreen.show();
    this.app.getRootNavs()[0].setRoot("IntroducaoPage");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  }
}