import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { CadastroEmpresaModel } from '../../../models/empresa.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-cadastro-empresa',
  templateUrl: 'cadastro-empresa.html',
})
export class CadastroEmpresaPage {

  empresa: CadastroEmpresaModel = new CadastroEmpresaModel();
  form: FormGroup;

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private empresaProvider: EmpresaProvider,
    private utilitarioProvider: UtilitariosProvider) {

    this.form = formBuilder.group({
      profilePic: [''],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      cpfcnpj: ['', Validators.required,],
      resumo: ['', Validators.required],
      telefone: ['', Validators.required],
      telefone2: ['', Validators.required],
      descontoCompartilhamento: ['', Validators.required],
      valorPontos: ['', Validators.required],
      senha: ['', Validators.required],
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
    this.empresa.Categorias = [1];
    this.empresa.Latitude = -16.6093353;
    this.empresa.Longitude = -49.3171053;

    this.empresaProvider.cadastreEmpresa(this.empresa)
      .then(() => {
        this.navCtrl.setRoot("LoginEmpresaPage");
      });
  }

  mostreInformacaoPontos(event: any) {
    this.utilitarioProvider.mestrePopInformacao("Valor de um ponto em dinheiro", event);
  }

  valideImagem() {
    return true;
  }

  valideDadosEmpresa() {
    return true;
  }

  valideDadosConta() {
    return true;
  }

  proximoSlide() {

    if (this.slides.getActiveIndex() == 0 && this.valideImagem()) {
      this.slides.slideNext();
      return;
    }

    if (this.slides.getActiveIndex() == 1 && this.valideDadosEmpresa()) {
      this.slides.slideNext();
      return;
    }

    if (this.slides.getActiveIndex() == 2 && this.valideDadosConta()) {
      
      if (!this.form.valid) {
        //mensagem de inconsistencia
      }

      this.cadastre();
    }

  }
}
