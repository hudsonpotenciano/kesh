import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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
  confirmacaoDaSenha: string = "";
  profilePic = undefined;

  conta: string = "conta";
  perfil: string = "perfil";
  financeiro: string = "financeiro";
  opcaoAtual = this.conta;

  @ViewChild('fileInput') fileInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empresaProvider: EmpresaProvider,
    private modalCtrl: ModalController) {
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
      this.profilePic = imageData;
      this.empresa.Logo = imageData.split(',')[1];
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.profilePic + ')'
  }

  cadastre() {

    this.empresaProvider.cadastreEmpresa(this.empresa)
      .then(() => {
        this.navCtrl.setRoot("LoginEmpresaPage");
      });
  }

  selecioneLocalizacao() {
    var modal = this.modalCtrl.create("SelecaoLocalizacaoPage", {
      lat: this.empresa.Latitude,
      long: this.empresa.Longitude
    }, { enableBackdropDismiss: false });

    modal.present();

    modal.onDidDismiss((coodenadas) => {

      if (!coodenadas) modal.present();

      this.empresa.Latitude = coodenadas.lat;
      this.empresa.Longitude = coodenadas.lng;
    });
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

  proximo() {
    if (this.opcaoAtual == this.conta) {
      this.opcaoAtual = this.perfil;
    }
    else if (this.opcaoAtual == this.perfil) {
      this.opcaoAtual = this.financeiro;
    }
    else {
      this.opcaoAtual = this.conta;
    }
  }

  obtenhaCategoriaSelecionada() {

    if (this.empresa.Categoria)
      return this.categorias.find(c => c.Codigo == this.empresa.Categoria).Descricao;
  }

  // makeid() {
  //   var text = "";
  //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  //   for (var i = 0; i < 10; i++)
  //     text += possible.charAt(Math.floor(Math.random() * possible.length));

  //   return text;
  // }

  // getRandomInt() {
  //   var min = Math.ceil(1000000);
  //   var max = Math.floor(90000000);
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }
}
