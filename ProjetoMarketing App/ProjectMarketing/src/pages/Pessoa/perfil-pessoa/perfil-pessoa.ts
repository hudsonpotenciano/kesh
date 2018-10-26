import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Pessoa } from '../../../models/pessoa.model';
import { StorageProvider } from '../../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-perfil-pessoa',
  templateUrl: 'perfil-pessoa.html',
})
export class PerfilPessoaPage {
  pessoa: Pessoa = new Pessoa();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private storage:StorageProvider) {
    this.pessoa.Nome = "";
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

  mudarSenha(){

  }
  
  sair(){
    this.storage.limpeTudo();
    this.navCtrl.setRoot("LoginPessoaPage");
  }
}