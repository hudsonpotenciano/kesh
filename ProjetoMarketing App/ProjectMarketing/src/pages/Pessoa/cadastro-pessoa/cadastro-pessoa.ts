import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { CadastroPessoaModel } from '../../../models/pessoa.model';

@IonicPage()
@Component({
  selector: 'page-cadastro-pessoa',
  templateUrl: 'cadastro-pessoa.html',
})
export class CadastroPessoaPage {

  @ViewChild('fileInput') fileInput;

  pessoa: CadastroPessoaModel = new CadastroPessoaModel();
  confirmacaoDaSenha: string;
  form: FormGroup;
  isReadyToSave: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private pessoaProvider: PessoaProvider) {

    this.form = formBuilder.group({
      profilePic: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
      confirmacaoDaSenha: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.isReadyToSave = this.form.valid;
    });
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
      this.pessoa.Foto = imageData.split(',')[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cadastre() {

    this.pessoaProvider.CadastrePessoa(this.pessoa)
      .then(() => {

      })
  }
}
