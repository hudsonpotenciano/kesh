import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { User } from '../../../models/models.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { Perfil } from '../../../models/empresa.model';

@IonicPage()
@Component({
  selector: 'page-login-empresa',
  templateUrl: 'login-empresa.html',
})
export class LoginEmpresaPage {

  usuario: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empresaProvider: EmpresaProvider,
    private popOverCtrl: PopoverController,
    private storageEmpresa: StorageEmpresaProvider) {

    this.usuario.Login = "adidas@gmail.com";
    this.usuario.Senha = "123456";
  }

  ionViewDidLoad() {
  }

  login() {

    this.empresaProvider.realizeLogin(this.usuario)
      .then(() => {
        this.abraModalSelecaoTipoLoginEmpresa();
      })
      .catch(() => { })
  }

  abraModalSelecaoTipoLoginEmpresa() {

    var popOver = this.popOverCtrl.create("SelecaoTipoLoginEmpresaPage", {}, { enableBackdropDismiss: false });
    popOver.present();

    popOver.onDidDismiss((selecao: number) => {
      if (selecao == 0) {
        this.navCtrl.setRoot("TabsEmpresaPage");
      }
      else if (selecao == 1) {

        this.empresaProvider.obtenhaPerfisEmpresa()
          .then((perfis: Perfil[]) => {
            
            if (perfis && perfis.length == 1) {
              this.storageEmpresa.armazeneIdPerfilEmpresa(perfis[0].IdPerfilEmpresa);
              this.navCtrl.setRoot("TabsEmpresaLojaPage");
            }
            else{
              this.abraModalSelecaoPerfisEmpresa(perfis);
            }
          });
      }
    });
  }

  abraModalSelecaoPerfisEmpresa(perfis: Perfil[]) {

    var popOver = this.popOverCtrl.create("SelecaoPerfisEmpresaPage", { perfis }, { enableBackdropDismiss: false });
    popOver.present();

    popOver.onDidDismiss((perfil: Perfil) => {
      if (!perfil)
        popOver.present();

      this.storageEmpresa.armazeneIdPerfilEmpresa(perfil.IdPerfilEmpresa);
      this.navCtrl.setRoot("TabsEmpresaLojaPage");
    });
  }

  abraCadastro() {
    this.navCtrl.push("CadastroEmpresaPage");
  }
}
