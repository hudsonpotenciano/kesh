import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { CadastroPessoaModel, CadastroPessoaRedeSocialModel } from '../../../models/pessoa.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-cadastro-pessoa',
  templateUrl: 'cadastro-pessoa.html',
})
export class CadastroPessoaPage {

  @ViewChild('fileInput') fileInput;

  pessoa: CadastroPessoaModel = new CadastroPessoaModel();
  pessoaRedeSocial: CadastroPessoaRedeSocialModel;

  confirmacaoDaSenha: string;
  isReadyToSave: boolean;
  profilePic = undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private utilitarioProvider: UtilitariosProvider) {

    if (this.navParams.get("CadastroPessoaRedeSocialModel")) {
      this.pessoaRedeSocial = this.navParams.get("CadastroPessoaRedeSocialModel");
    }
  }

  ionViewDidLoad() {
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.profilePic = imageData;
      let imagem = imageData.split(',')[1];

      if (this.pessoaRedeSocial)
        this.pessoaRedeSocial.Foto = imagem;
      else
        this.pessoa.Foto = imagem;
    };

    if (event.target.files.length > 0)
      reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    if (this.pessoaRedeSocial) return 'url(' + this.pessoaRedeSocial.Foto + ')'
    return 'url(' + this.profilePic + ')'
  }

  podeSalvar() {
    if (!this.pessoa.Nome || this.pessoa.Nome == "") {
      this.utilitarioProvider.mostreToast("Informe o seu nome");
      return false;
    }
    if (!this.pessoa.Email || this.pessoa.Email == "") {
      this.utilitarioProvider.mostreToast("Informe o seu email");
      return false;
    }
    if (!this.pessoa.Senha || this.pessoa.Senha == "") {
      this.utilitarioProvider.mostreToast("Informe a senha");
      return false;
    }
    if (this.pessoa.Senha && this.pessoa.Senha.length < 6) {
      this.utilitarioProvider.mostreToast("A senha deve conter pelo menos 6 caracteres");
      return false;
    }
    if (this.confirmacaoDaSenha != this.pessoa.Senha) {
      this.utilitarioProvider.mostreToast("A senha está diferente da confirmação");
      return false;
    }
    return true;
  }

  cadastre() {

    if (!this.podeSalvar()) return;

    this.pessoaProvider.cadastrePessoa(this.pessoa)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      })
      .catch(() => {

      });
  }

  cadastreRedeSocial() {

    this.utilitarioProvider.getBase64Image(this.pessoaRedeSocial.Foto, (foto) => {
      this.pessoaRedeSocial.Foto = foto;
      this.pessoaProvider.cadastrePessoaRedeSocial(this.pessoaRedeSocial)
        .then(() => {
          this.navCtrl.setRoot("TabsPessoaPage");
        })
        .catch(() => {

        });
    });
  }

  voltar() {
    this.navCtrl.pop();
  }
}
