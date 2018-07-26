import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { ImagemCatalogo, DadosEmpresa } from '../../../models/empresa.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';

@IonicPage()
@Component({
  selector: 'page-conta-empresa',
  templateUrl: 'conta-empresa.html',
})

export class ContaEmpresaPage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') Slides: Slides;

  form: FormGroup;
  imagensCatalogo: ImagemCatalogo[] = [];
  dadosEmpresa: DadosEmpresa;

  constructor(public navCtrl: NavController,
    formBuilder: FormBuilder,
    public navParams: NavParams,
    private empresaProvider: EmpresaProvider,
    private storageEmpresa: StorageEmpresaProvider) {

    this.empresaProvider.obtenhaDadosEmpresa()
      .then((retorno: DadosEmpresa) => {
        this.dadosEmpresa = retorno;
        this.imagensCatalogo = this.dadosEmpresa.PerfilEmpresa.Catalogo;
        debugger;
      });

    this.form = formBuilder.group({
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContaEmpresaPage');
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      if (!this.imagensCatalogo[this.imagensCatalogo.length])
        this.imagensCatalogo[this.imagensCatalogo.length] = new ImagemCatalogo();

      this.imagensCatalogo[this.imagensCatalogo.length - 1].Imagem = (readerEvent.target as any).result.split(",")[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  removaImagem(i: number) {
    this.imagensCatalogo.splice(i, 1);
    this.Slides.slidePrev();
  }

  salveImagensCatalogo() {

    this.dadosEmpresa.PerfilEmpresa.Catalogo = this.imagensCatalogo;

    this.empresaProvider.atualizeCatalogo(this.imagensCatalogo).then(() => {
      this.storageEmpresa.armazeneDadosEmpresa(this.dadosEmpresa);
    });
  }
}