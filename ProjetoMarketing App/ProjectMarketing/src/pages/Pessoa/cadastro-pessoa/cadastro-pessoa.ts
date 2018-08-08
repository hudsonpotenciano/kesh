import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PessoaProvider } from '../../../providers/pessoa/pessoa';
import { CadastroPessoaModel, CadastroPessoaRedeSocialModel } from '../../../models/pessoa.model';
import { RetornoRequestModel } from '../../../models/models.model';

@IonicPage()
@Component({
  selector: 'page-cadastro-pessoa',
  templateUrl: 'cadastro-pessoa.html',
})
export class CadastroPessoaPage {

  @ViewChild('fileInput') fileInput;

  pessoa: CadastroPessoaModel = new CadastroPessoaModel();
  pessoaRedeSocial: CadastroPessoaRedeSocialModel = new CadastroPessoaRedeSocialModel();

  confirmacaoDaSenha: string;
  form: FormGroup;
  form2: FormGroup;
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
      senha: ['', Validators.required],
      confirmacaoDaSenha: ['', Validators.required]
    });

    this.form2 = formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.navParams.get("CadastroPessoaRedeSocialModel")) {
      debugger;
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
      this.pessoa.Foto = imageData.split(',')[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cadastre() {
    this.pessoaProvider.cadastrePessoa(this.pessoa)
      .then(() => {
        this.navCtrl.setRoot("TabsPessoaPage");
      })
      .catch((e: RetornoRequestModel) => {
        alert(e.Mensagem);
      });
  }

  cadastreRedeSocial(){
    this.pessoaProvider.cadastrePessoaRedeSocial(this.pessoaRedeSocial)
    .then(() => {
      this.navCtrl.setRoot("TabsPessoaPage");
    })
    .catch((e: RetornoRequestModel) => {
      alert(e.Mensagem);
    });
  }
}
