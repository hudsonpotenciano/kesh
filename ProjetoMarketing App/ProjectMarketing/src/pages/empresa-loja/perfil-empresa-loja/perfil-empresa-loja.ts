import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, ModalController } from 'ionic-angular';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { DadosEmpresaLoja, ImagemCatalogo, AtualizaPerfilModel } from '../../../models/empresa.model';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { StorageProvider } from '../../../providers/storage/storage';

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
  segment: string = "cadastro";

  constructor(private storageEmpresa: StorageEmpresaProvider,
    private storage: StorageProvider,
    private empresaLojaProvider: EmpresaLojaProvider,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private utilitarios: UtilitariosProvider) {

    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      telefone: ['', Validators.required],
      telefone2: ['', Validators.required],
    });

    this.dadosEmpresa = this.storageEmpresa.recupereDadosEmpresaLoja()
    this.imagensCatalogo = this.dadosEmpresa.Catalogo;
  };

  ionViewDidLoad() {

  }

  selecioneLocalizacao() {
    var modal = this.modalCtrl.create("SelecaoLocalizacaoPage", {
      lat: this.dadosEmpresa.Perfil.Latitude,
      long: this.dadosEmpresa.Perfil.Longitude
    }, { enableBackdropDismiss: false });

    modal.present();

    modal.onDidDismiss((coodenadas) => {

      if (!coodenadas) modal.present();

      this.dadosEmpresa.Perfil.Latitude = coodenadas.lat;
      this.dadosEmpresa.Perfil.Longitude = coodenadas.lng;
    });
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      if (!this.imagensCatalogo[this.imagensCatalogo.length])
        this.imagensCatalogo[this.imagensCatalogo.length] = new ImagemCatalogo();

      this.utilitarios.getBase64Image((readerEvent.target as any).result, (imagem) => {

        this.imagensCatalogo[this.imagensCatalogo.length - 1].Imagem = imagem;
      })
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  removaImagem(i: number) {
    this.imagensCatalogo.splice(i, 1);
    this.Slides.slidePrev();
  }

  salvar() {

    if (this.dadosEmpresa.Perfil.Latitude == 0 || this.dadosEmpresa.Perfil.Longitude == 0) {
      alert("Selecione a localizacao");
      return;
    }

    let perfil: AtualizaPerfilModel = new AtualizaPerfilModel();

    perfil.Descricao = this.dadosEmpresa.Perfil.Descricao;
    perfil.Telefone = this.dadosEmpresa.Perfil.Telefone;
    perfil.Telefone2 = this.dadosEmpresa.Perfil.Telefone2;
    perfil.IdPerfilEmpresa = this.dadosEmpresa.Perfil.IdPerfilEmpresa;
    perfil.Catalogo = this.imagensCatalogo;
    perfil.Latitude = this.dadosEmpresa.Perfil.Latitude;
    perfil.Longitude = this.dadosEmpresa.Perfil.Longitude;

    this.empresaLojaProvider.atualizePerfilEmpresa(perfil)
      .then(() => {
        this.storageEmpresa.armazeneDadosEmpresaLoja(this.dadosEmpresa);
      });
  }

  sair() {
    this.storage.limpeTudo();
  }
}