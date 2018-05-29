import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastroEmpresaModel } from '../../../models/pessoa.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-cadastro-empresa',
  templateUrl: 'cadastro-empresa.html',
})
export class CadastroEmpresaPage {
 
  empresa: CadastroEmpresaModel = new CadastroEmpresaModel();
  form: FormGroup;
  isReadyToSave: boolean;

  @ViewChild('fileInput') fileInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private empresaProvider: EmpresaProvider) {

    this.form = formBuilder.group({
      profilePic: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      cpfcnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      senha: ['', Validators.required],
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
      this.empresa.Logo = imageData.split(',')[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cadastre() {
    
    this.empresa.Resumo = "";
    this.empresa.RecompensaCompartilhamento = 1;
    this.empresa.RecompensaPontos = 1;
    this.empresa.Latitude = "1";
    this.empresa.Longitude = "1";
    this.empresa.Categorias = [1];

    this.empresaProvider.CadastreEmpresa(this.empresa)
      .then(() => {

      })
  }

}
