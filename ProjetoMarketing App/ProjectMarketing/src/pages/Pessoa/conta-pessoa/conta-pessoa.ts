import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pessoa } from '../../../models/pessoa.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-conta-pessoa',
  templateUrl: 'conta-pessoa.html',
})

export class ContaPessoaPage {
  
  @ViewChild('fileInput') fileInput;
  
  pessoa: Pessoa;
  form: FormGroup;
  Foto: string;

  constructor(public navCtrl: NavController,
    formBuilder: FormBuilder,
    public navParams: NavParams,
    private pessoaProvider: PessoaProvider,
    private utilitarios: UtilitariosProvider) {
    this.form = formBuilder.group({
      profilePic: [''],
    });
  }

  ionViewDidLoad() {
    this.pessoaProvider.ObtenhaDadosPessoa()
      .then((pessoa: Pessoa) => {
        this.pessoa = pessoa;
        debugger;
        this.form.controls['profilePic'].setValue(this.pessoaProvider.obtenhaFotoPessoa(this.pessoa.IdPessoa));
      });
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });

      this.utilitarios.getBase64Image((readerEvent.target as any).result, (imagem) => {
        this.Foto = imagem;
      })
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  abraEdicaoDePerfil(){
    
  }
  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

}
