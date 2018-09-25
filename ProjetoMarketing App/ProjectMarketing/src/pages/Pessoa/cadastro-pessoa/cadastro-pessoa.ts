import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  form: FormGroup;
  form2: FormGroup;
  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private pessoaProvider: PessoaProvider,
    private utilitarioProvider: UtilitariosProvider) {

    this.form = formBuilder.group({
      profilePic: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmacaoDaSenha: ['', Validators.required]
    });

    this.form2 = formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
    });

    debugger;
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
      this.form.patchValue({ 'profilePic': imageData });
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
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cadastre() {
    this.pessoaProvider.cadastrePessoa(this.pessoa)
      .then(() => {
        debugger;
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
}
