import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { User, RetornoLogin } from '../../../models/models.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { Perfil } from '../../../models/empresa.model';
import { StorageProvider } from '../../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-login-empresa',
  templateUrl: 'login-empresa.html',
})
export class LoginEmpresaPage {

  usuario: User = new User();
  views: Array<string> = ["login", "selecaoTipo", "loginAdmin"];
  dadosAcesso: RetornoLogin;
  viewAtual: string = this.views[0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empresaProvider: EmpresaProvider,
    private storage: StorageProvider,
    private popOverCtrl: PopoverController,
    private storageEmpresa: StorageEmpresaProvider) {

    this.usuario.Login = "teste2@gmail.com";
    this.usuario.Senha = "123456";

  }

  ionViewDidLoad() {

  }

  login() {

    this.empresaProvider.realizeLogin(this.usuario)
      .then((retornoLogin: RetornoLogin) => {
        this.dadosAcesso = retornoLogin;
        this.viewAtual = this.views[1];
      })
      .catch(() => {
      })
  }

  selecaoTipoLoginEmpresa(selecao: number) {

    if (selecao == 0) {
      this.viewAtual = this.views[2];
    }
    else if (selecao == 1) {

      this.empresaProvider.obtenhaPerfisEmpresa()
        .then((perfis: Perfil[]) => {

          if (perfis && perfis.length == 1) {
            this.storageEmpresa.armazeneIdPerfilEmpresa(perfis[0].IdPerfilEmpresa);
            this.navCtrl.setRoot("TabsEmpresaLojaPage");
            this.storage.armazeneDadosAcesso(this.dadosAcesso);
          }
          else {
            this.abraModalSelecaoPerfisEmpresa(perfis);
          }
        });
    }
  }

  abraModalSelecaoPerfisEmpresa(perfis: Perfil[]) {

    var popOver = this.popOverCtrl.create("SelecaoPerfisEmpresaPage", { perfis }, { enableBackdropDismiss: false });
    popOver.present();

    popOver.onDidDismiss((perfil: Perfil) => {
      if (!perfil)
        popOver.present();

      this.navCtrl.setRoot("TabsEmpresaLojaPage");
      this.storage.armazeneDadosAcesso(this.dadosAcesso);
      this.storageEmpresa.armazeneIdPerfilEmpresa(perfil.IdPerfilEmpresa);
    });
  }

  voltar() {
    var index = this.views.indexOf(this.viewAtual);
    if (index <= (this.views.length - 1)) {
      this.viewAtual = this.views[index - 1];
    }
  }

  abraCadastro() {
    this.navCtrl.push("CadastroEmpresaPage");
  }

  realizeLoginEmpresaAdmin() {

    this.empresaProvider.realizeLoginAdmin(this.usuario)
      .then((resposta) => {
        if (resposta && resposta.Erro === 0) {
          this.navCtrl.setRoot("TabsEmpresaPage");

          this.storage.armazeneDadosAcesso(this.dadosAcesso);
        }
        else
          alert("nao autenticado");
      })
      .catch(() => {
        alert("nao autenticado");
      })
  }
}