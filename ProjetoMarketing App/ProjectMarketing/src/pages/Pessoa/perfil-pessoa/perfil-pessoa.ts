import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { Pessoa } from '../../../models/pessoa.model';


@IonicPage()
@Component({
  selector: 'page-perfil-pessoa',
  templateUrl: 'perfil-pessoa.html',
})
export class PerfilPessoaPage {
  @ViewChild('fileInput') fileInput;
  pessoa: Pessoa = new Pessoa();
  foto: any;
  profilePic = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider) {
    this.pessoa.Nome = "";
  }

  ionViewDidLoad() {
    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa) => {
        this.pessoa = pessoa;
        this.profilePic = this.pessoaProvider.obtenhaFotoPessoa(this.pessoa.IdPessoa);
      })
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

      this.foto = imagem;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.profilePic + ')'
  }
}