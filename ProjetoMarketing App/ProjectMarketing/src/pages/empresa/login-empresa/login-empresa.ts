import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { User, RetornoLogin } from '../../../models/models.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { Perfil } from '../../../models/empresa.model';
import { StorageProvider } from '../../../providers/storage/storage';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-login-empresa',
  templateUrl: 'login-empresa.html',
})
export class LoginEmpresaPage {

  usuario: User = new User();
  views: Array<string> = ["login", "selecaoTipo", "loginAdmin", "selecaoPerfil"];
  dadosAcesso: RetornoLogin;
  viewAtual: string = this.views[0];
  perfisEmpresa: Perfil[];
  inputPesquisaPerfisEmpresa: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private empresaProvider: EmpresaProvider,
    private storage: StorageProvider,
    private utilitarios: UtilitariosProvider,
    private storageEmpresa: StorageEmpresaProvider) {

    this.usuario.Login = "teste2@gmail.com";
    this.usuario.Senha = "123456";

  }

  ionViewDidLoad() {
  }

  login() {
    this.utilitarios.mostreAlertaCarregando("Buscando seus dados, aguarde um instante.");
    this.empresaProvider.realizeLogin(this.usuario)
      .then((retornoLogin: RetornoLogin) => {
        this.dadosAcesso = retornoLogin;
        this.viewAtual = this.views[1];
        this.utilitarios.removaAlertaCarregando();
      })
      .catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Login ou senha não encontrados");
      })
  }

  selecaoTipoLoja() {
    this.empresaProvider.obtenhaPerfisEmpresa()
      .then((perfis: Perfil[]) => {

        if (perfis && perfis.length == 1) {
          this.selecaoIdPerfilEmpresa(perfis[0]);
        }
        else {
          this.perfisEmpresa = perfis;
          this.viewAtual = this.views[3];
        }
      });
  }

  selecaoIdPerfilEmpresa(perfil: Perfil) {

    this.storage.armazeneDadosAcesso(this.dadosAcesso);
    this.storageEmpresa.armazeneIdPerfilEmpresa(perfil.IdPerfilEmpresa);
    this.navCtrl.setRoot("TabsEmpresaLojaPage");
  }

  selecaoTipoAdmin() {
    this.viewAtual = this.views[2];
  }

  voltar() {
    var index = this.views.indexOf(this.viewAtual);
    if (this.viewAtual == this.views[0]) this.navCtrl.setRoot("IntroducaoPage");
    else if (index <= (this.views.length - 1)) {
      this.viewAtual = this.views[index - 1];
    }
  }

  abraCadastro() {
    this.app.getRootNavs()[0].push("CadastroEmpresaPage");
  }

  realizeLoginEmpresaAdmin() {

    this.utilitarios.mostreAlertaCarregando("Validando dados de administrador, aguarde um instante.")
    this.empresaProvider.realizeLoginAdmin(this.usuario)
      .then((resposta) => {
        if (resposta && resposta.Erro === 0) {
          this.navCtrl.setRoot("TabsEmpresaPage");
          this.storage.armazeneDadosAcesso(this.dadosAcesso);
          this.utilitarios.removaAlertaCarregando();
        }
        else {
          this.utilitarios.removaAlertaCarregando();
          this.utilitarios.mostreMensagemErro("A senha de adminstrador está incorreta");
        }
      })
      .catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("A senha de adminstrador está incorreta");
      })
  }

  onSearchPerfilEmpresa(evento) {
    evento;
  }
}