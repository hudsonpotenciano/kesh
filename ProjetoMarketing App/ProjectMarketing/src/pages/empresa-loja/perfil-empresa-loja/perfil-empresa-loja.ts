import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides } from 'ionic-angular';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { DadosEmpresaLoja, ImagemCatalogo } from '../../../models/empresa.model';
import { FormGroup, FormBuilder } from '../../../../node_modules/@angular/forms';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa-loja',
  templateUrl: 'perfil-empresa-loja.html',
})
export class PerfilEmpresaLojaPage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') Slides: Slides;

  form: FormGroup;
  imagensCatalogo: ImagemCatalogo[] = [];
  dadosEmpresa: DadosEmpresaLoja;

  constructor(private storageEmpresa: StorageEmpresaProvider,
    private empresaLojaProvider: EmpresaLojaProvider,
    private formBuilder: FormBuilder) {

    this.dadosEmpresa = this.storageEmpresa.recupereDadosEmpresaLoja()

    this.imagensCatalogo = this.dadosEmpresa.Catalogo;

    this.form = this.formBuilder.group({
    });
  };

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

    this.dadosEmpresa.Catalogo = this.imagensCatalogo;

    this.empresaLojaProvider.atualizeCatalogo(this.imagensCatalogo).then(() => {
      this.storageEmpresa.armazeneDadosEmpresaLoja(this.dadosEmpresa);
    });
  }
}
