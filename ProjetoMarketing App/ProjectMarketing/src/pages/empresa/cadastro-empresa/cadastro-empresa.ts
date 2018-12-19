import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { CadastroEmpresaModel } from '../../../models/empresa.model';
import { Enumerador, EnumeradorDeCategorias } from '../../../models/enumeradores.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

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

  @ViewChild('fileInput') fileInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private utilitarios: UtilitariosProvider,
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
    this.utilitarios.mostreAlertaCarregando("Salvando dados da empresa, aguarde um instante.");
    this.empresaProvider.cadastreEmpresa(this.empresa)
      .then(() => {
        this.utilitarios.removaAlertaCarregando();
        this.navCtrl.setRoot("LoginEmpresaPage");
      })
      .catch(() => {
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Ocorreu um erro ao cadastrar a empresa, tente novamente.");
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

  podeSalvarPerfil() {
    if (!this.empresa.Latitude || this.empresa.Latitude == 0 || !this.empresa.Longitude || this.empresa.Longitude == 0) {
      alert("selecione a localizacao da loja");
      return false;
    }
    return true;
  }
  podeSalvarConta() {
    if (this.empresa.Senha.length < 6) {
      alert("a senha deve conter pelo menos 6 caracteres");
      return false;
    }
    if (this.empresa.Senha != this.confirmacaoDaSenha) {
      alert("a senha está diferente da confirmacao");
      return false;
    }
    if (this.empresa.SenhaAdmin == "") {
      alert("Informe a senha de administrador");
      return false;
    }
    if (this.empresa.SenhaAdmin.length < 6) {
      alert("a senha de admin deve conter pelo menos 6 caracteres");
      return false;
    }
    return true;
  }

  obtenhaCategoriaSelecionada() {

    if (this.empresa.Categoria)
      return this.categorias.find(c => c.Codigo == this.empresa.Categoria).Descricao;
  }
}

