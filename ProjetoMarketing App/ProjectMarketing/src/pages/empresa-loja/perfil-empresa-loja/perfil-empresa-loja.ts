import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController, Slides, NavController } from 'ionic-angular';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { DadosEmpresaLoja, ImagemCatalogo, AtualizaPerfilModel } from '../../../models/empresa.model';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-perfil-empresa-loja',
  templateUrl: 'perfil-empresa-loja.html',
})
export class PerfilEmpresaLojaPage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') Slides: Slides;

  imagensCatalogo: ImagemCatalogo[] = [];
  dadosEmpresa: DadosEmpresaLoja;
  segment: string = "cadastro";

  constructor(private storageEmpresa: StorageEmpresaProvider,
    private empresaLojaProvider: EmpresaLojaProvider,
    private sanitizer: DomSanitizer,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private utilitarios: UtilitariosProvider) {
    this.sanitizer;
    this.dadosEmpresa = this.storageEmpresa.recupereDadosEmpresaLoja()
    this.imagensCatalogo = this.dadosEmpresa.Catalogo;
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

    this.utilitarios.mostreAlertaCarregando("Adicionando a imagem selecionada, aguarde um instante.");
    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      if (!this.imagensCatalogo[this.imagensCatalogo.length])
        this.imagensCatalogo[this.imagensCatalogo.length] = new ImagemCatalogo();

      this.utilitarios.getBase64Image((readerEvent.target as any).result, (imagem) => {
        this.imagensCatalogo[this.imagensCatalogo.length - 1].Imagem = imagem;
        this.utilitarios.removaAlertaCarregando();
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  removaImagem(i: number) {
    this.imagensCatalogo.splice(i, 1);
    this.Slides.slidePrev();
  }

  salvar() {
    debugger;
    let perfil: AtualizaPerfilModel = new AtualizaPerfilModel();
    perfil.Descricao = this.dadosEmpresa.Perfil.Descricao;
    perfil.Telefone = this.dadosEmpresa.Perfil.Telefone;
    perfil.Telefone2 = this.dadosEmpresa.Perfil.Telefone2;
    perfil.IdPerfilEmpresa = this.dadosEmpresa.Perfil.IdPerfilEmpresa;
    perfil.Catalogo = this.imagensCatalogo;
    perfil.Latitude = this.dadosEmpresa.Perfil.Latitude;
    perfil.Longitude = this.dadosEmpresa.Perfil.Longitude;
    debugger;
    this.utilitarios.mostreAlertaCarregando("Salvando dados da loja, aguarde um instante.");
    this.empresaLojaProvider.atualizePerfilEmpresa(perfil)
      .then(() => {
        this.storageEmpresa.armazeneDadosEmpresaLoja(this.dadosEmpresa);
        this.utilitarios.removaAlertaCarregando();
        this.navCtrl.pop();
        this.utilitarios.mostreMensagemSucesso("Dados salvos com sucesso");
      }).catch((retorno) => {
        retorno;
        this.navCtrl.pop();
        this.utilitarios.mostreMensagemErro("Houve um erro ao salvar os dados, tente novamente");
        this.utilitarios.removaAlertaCarregando();
      })
  }

  voltar() {
    this.navCtrl.pop();
  }
}
