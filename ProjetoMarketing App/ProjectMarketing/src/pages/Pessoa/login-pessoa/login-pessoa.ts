import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public pessoaProvider: PessoaProvider,
    private utilitarioProvider: UtilitariosProvider,
    private fb: Facebook) {
  }

  ionViewDidLoad() {
    this.usuario.Login = "hudsonpot@gmail.com";
    this.usuario.Senha = "123456";
  }

  loginFacebook() {
    debugger;

    this.fb.login(['public_profile', 'email'])
      .then((responseLogin: FacebookLoginResponse) => {

        this.fb.api("/me?fields=name,email", new Array<string>())
          .then(res => {

            var user: SocialUser = new SocialUser();
            user.Email = res.email;
            user.Id = responseLogin.authResponse.userID;

            this.pessoaProvider.realizeLoginRedeSocial(user)
              .then(() => {
                this.navCtrl.setRoot("TabsPessoaPage");
              })
              .catch(() => {

                var CadastroPessoaRedeSocialModel = {
                  Email: res.email,
                  Foto: this.obtenhaFotoFacebook(responseLogin.authResponse.userID),
                  Nome: res.name,
                  Id : responseLogin.authResponse.userID
                } as CadastroPessoaRedeSocialModel;

                this.navCtrl.push("CadastroPessoaPage", CadastroPessoaRedeSocialModel)
              })
          });
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  obtenhaFotoFacebook(userId: string) {
    this.fb.api(`/${userId}/picture`, new Array<string>())
      .then(res => {
        return this.getBase64Image(res.data.url);
      })
      .catch(() => {
        return "";
      })
  }

  login() {

    this.pessoaProvider.realizeLogin(this.usuario)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      })
  }

  abraCadastro() {
    this.navCtrl.push("CadastroPessoaPage");
  }

  mostreInformacao(event: any) {
    this.utilitarioProvider.mestrePopInformacao("adas", event);
  }

  getBase64Image(url: string) {

    let img = document.createElement("img") as HTMLImageElement;
    img.src = url;

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      return dataURL;
    }
  }
}
