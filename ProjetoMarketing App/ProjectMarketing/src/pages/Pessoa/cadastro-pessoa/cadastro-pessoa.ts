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

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    if (this.pessoaRedeSocial) return 'url(' + this.pessoaRedeSocial.Foto + ')'
    return 'url(' + this.profilePic + ')'
  }

  cadastre() {
    this.pessoaProvider.cadastrePessoa(this.pessoa)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      });
  }

  cadastreRedeSocial() {

    this.utilitarioProvider.getBase64Image(this.pessoaRedeSocial.Foto, (foto) => {
      this.pessoaRedeSocial.Foto = foto;
      this.pessoaProvider.cadastrePessoaRedeSocial(this.pessoaRedeSocial)
        .then(() => {
          this.navCtrl.setRoot("TabsPessoaPage");
        });
    });
  }

  voltar(){
    this.navCtrl.pop();
  }
}
