import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-conta-empresa',
  templateUrl: 'conta-empresa.html',
})

export class ContaEmpresaPage {

  @ViewChild('fileInput') fileInput;
  form: FormGroup;
  imagensCatalogo: any[] = [];

  constructor(public navCtrl: NavController,
    formBuilder: FormBuilder,
    public navParams: NavParams,
    private empresaProvider: EmpresaProvider) {

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
      debugger;
      this.imagensCatalogo[this.imagensCatalogo.length] = (readerEvent.target as any).result.split(",")[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  salveImagensCatalogo() {
    this.empresaProvider.atualizeCatalogo(this.imagensCatalogo);
  }
}