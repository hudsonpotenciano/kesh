import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { User, SocialUser } from '../../../models/models.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { CadastroPessoaRedeSocialModel } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-login-pessoa',
  templateUrl: 'login-pessoa.html',
})

export class LoginPessoaPage {

  usuario: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    public pessoaProvider: PessoaProvider,
    private utilitarioProvider: UtilitariosProvider,
    private fb: Facebook) {
  }

  ionViewDidLoad() {
    this.usuario.Login = "hudsonpot@gmail.com";
    this.usuario.Senha = "123456";
  }

  loginFacebook() {

    this.fb.login(['public_profile', 'email'])
      .then((responseLogin: FacebookLoginResponse) => {

        this.fb.api("/me?fields=name,email,picture.width(150).height(150)", new Array<string>())
          .then(resFb => {

            var user: SocialUser = new SocialUser();
            user.Email = resFb.email;
            user.Id = responseLogin.authResponse.userID;

            this.pessoaProvider.realizeLoginRedeSocial(user)
              .then(() => {
                this.navCtrl.setRoot("TabsPessoaPage");
              })
              .catch(() => {

                var cadastroPessoaRedeSocialModel = {
                  Email: resFb.email,
                  Foto: resFb.picture.data.url,
                  Nome: resFb.name,
                  Id: responseLogin.authResponse.userID
                } as CadastroPessoaRedeSocialModel;

                this.app.getRootNavs()[0].push("CadastroPessoaPage", { CadastroPessoaRedeSocialModel: cadastroPessoaRedeSocialModel });
              });
          });
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  login() {

    this.pessoaProvider.realizeLogin(this.usuario)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      }).catch(() => {

      });
  }

  abraCadastro() {
    this.app.getRootNavs()[0].push("CadastroPessoaPage");
  }

  mostreInformacao(event: any) {
    this.utilitarioProvider.mestrePopInformacao("adas", event);
  }

  voltar() {
    this.navCtrl.setRoot("IntroducaoPage");
  }
}
