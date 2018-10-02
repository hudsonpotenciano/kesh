import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { CadastroEmpresaModel } from '../../../models/empresa.model';
import { Enumerador, EnumeradorDeCategorias } from '../../../models/enumeradores.model';

@IonicPage()
@Component({
  selector: 'page-cadastro-empresa',
  templateUrl: 'cadastro-empresa.html',
})
export class CadastroEmpresaPage {

  categorias: Enumerador[] = new EnumeradorDeCategorias().obtenhaTodos();
  empresa: CadastroEmpresaModel = new CadastroEmpresaModel();
  form: FormGroup;

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    formBuilder: FormBuilder,
    private empresaProvider: EmpresaProvider) {

    this.form = formBuilder.group({
      profilePic: [''],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
      cpfcnpj: ['', Validators.required,],
      resumo: ['', Validators.required],
      telefone: ['', Validators.required],
      telefone2: ['', Validators.required],
      valorPontos: ['', Validators.required],
      senha: ['', Validators.required],
      categoria: ['', Validators.required]
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

      setTimeout(() => {
        this.proximoSlide();
      }, 2000);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cadastre() {

    for (let index = 0; index < 50; index++) {

      setTimeout(() => {

        this.empresa.Latitude = -16.6093353;
        this.empresa.Longitude = -49.3171053;
        var nome = this.makeid();
        this.empresa.Email = nome + "@gmail.com";
        this.empresa.Nome = nome;
        this.empresa.Cnpj = this.getRandomInt().toString();
        console.log(this.empresa.Cnpj);
        this.empresaProvider.cadastreEmpresa(this.empresa)
          .then(() => {
            // this.navCtrl.setRoot("LoginEmpresaPage");
          });
      }, 1000);
    }

    // this.empresa.Latitude = -16.6093353;
    // this.empresa.Longitude = -49.3171053;

    // this.empresaProvider.cadastreEmpresa(this.empresa)
    //   .then(() => {
    //     this.navCtrl.setRoot("LoginEmpresaPage");
    //   });
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

  obtenhaCategoriaSelecionada() {
    if (this.empresa.Categoria)
      return this.categorias.find(c => c.Codigo == this.empresa.Categoria).Descricao;
  }

  makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  getRandomInt() {
    var min = Math.ceil(1000000);
    var max = Math.floor(90000000);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
