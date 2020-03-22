import { Component, ViewChild, Sanitizer } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { CadastroEmpresaModel, ImagemCatalogo } from '../../../models/empresa.model';
import { Enumerador, EnumeradorDeCategorias } from '../../../models/enumeradores.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';

@IonicPage()
@Component({
  selector: 'page-cadastro-empresa',
  templateUrl: 'cadastro-empresa.html',
})
export class CadastroEmpresaPage {

  categorias: Enumerador[] = new EnumeradorDeCategorias().obtenhaTodos();
  empresa: CadastroEmpresaModel = new CadastroEmpresaModel();
  confirmacaoDaSenha: string = "";
  confirmacaoDaSenhaAdmin: string = "";
  profilePic = undefined;
  posicao: string = "informacoes";
  plano: string;
  planos: string[] = ["Plano 1 - R$50", "Plano 2 - R$100", "Plano 3 - R$200"];

  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInputCatalogo') fileInputCatalogo;
  @ViewChild('slides') Slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private empresaLojaProvider: EmpresaLojaProvider,
    private utilitarios: UtilitariosProvider,
    private sanitizer: Sanitizer,
    private empresaProvider: EmpresaProvider,
    private modalCtrl: ModalController) {
    this.empresaLojaProvider;
    this.sanitizer;
    this.empresa.Catalogo = [];
  }

  ionViewDidLoad() {

  }

  selecioneImagemLogo() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagemLogo(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.profilePic = imageData;
      this.empresa.Logo = imageData.split(',')[1];
    };

    if (event.target.files.length > 0)
      reader.readAsDataURL(event.target.files[0])
  }

  getProfileImageStyle() {
    return 'url(' + this.profilePic + ')'
  }

  cadastre() {
    if (!this.podeSalvar()) return;
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
      if (!coodenadas) return;
      this.empresa.Latitude = coodenadas.lat;
      this.empresa.Longitude = coodenadas.lng;
    });
  }

  podeSalvar() {
    if (!this.empresa.Nome || this.empresa.Nome.trim() == "") {
      this.utilitarios.mostreToast("Informe o nome");
      return false;
    }
    if (!this.empresa.Senha || this.empresa.Senha.length < 6) {
      this.utilitarios.mostreToast("A senha deve conter pelo menos 6 caracteres");
      return false;
    }
    if (this.empresa.Senha != this.confirmacaoDaSenha) {
      this.utilitarios.mostreToast("A senha está diferente da confirmação");
      return false;
    }
    if (this.empresa.SenhaAdmin == "") {
      this.utilitarios.mostreToast("Informe a senha de administrador");
      return false;
    }
    if (this.empresa.SenhaAdmin != this.confirmacaoDaSenhaAdmin) {
      this.utilitarios.mostreToast("A senha de administrador está diferente da confirmação");
      return false;
    }
    if (this.empresa.SenhaAdmin.length < 6) {
      this.utilitarios.mostreToast("A senha de admin deve conter pelo menos 6 caracteres");
      return false;
    }
    if (!this.empresa.Latitude || this.empresa.Latitude == 0 || !this.empresa.Longitude || this.empresa.Longitude == 0) {
      this.utilitarios.mostreToast("selecione a localizacao da loja");
      return false;
    }
    if (!this.empresa.Logo || this.empresa.Logo == "") {
      this.utilitarios.mostreToast("Selecione uma imagem de logotipo");
      return false;
    }
    if (!this.empresa.Catalogo || this.empresa.Catalogo.length == 0) {
      this.utilitarios.mostreToast("Adicione imagens ao catálogo");
      return false;
    }

    return true;
  }

  obtenhaCategoriaSelecionada() {

    if (this.empresa.Categoria)
      return this.categorias.find(c => c.Codigo == this.empresa.Categoria).Descricao;
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      if (!this.empresa.Catalogo[this.empresa.Catalogo.length])
        this.empresa.Catalogo[this.empresa.Catalogo.length] = new ImagemCatalogo();

      this.utilitarios.getBase64Image((readerEvent.target as any).result, (imagem) => {
        this.empresa.Catalogo[this.empresa.Catalogo.length - 1].Imagem = imagem;

        setTimeout(() => {
          this.Slides.slideNext();
        }, 1000);
      })
    };

    if (event.target.files.length > 0)
      reader.readAsDataURL(event.target.files[0]);
  }

  selecioneImagem() {
    this.fileInputCatalogo.nativeElement.click();
  }

  removaImagem() {
    this.empresa.Catalogo.splice(this.Slides.getActiveIndex(), 1);
    this.Slides.slidePrev();
  }

  voltar() {
    if (this.posicao == 'informacoes') {
      this.navCtrl.pop();
    }
    else if (this.posicao == 'pagamento') {
      this.posicao = "informacoes";
    }
    else if (this.posicao == 'catalogo') {
      this.posicao = "pagamento";
    }
  }

  continuar() {
    if (this.posicao == 'informacoes') {
      this.posicao = 'pagamento';
    }
    else if (this.posicao == 'pagamento') {
      this.posicao = "catalogo";
    }
    else if (this.posicao == 'catalogo') {
      this.cadastre();
    }
  }
}