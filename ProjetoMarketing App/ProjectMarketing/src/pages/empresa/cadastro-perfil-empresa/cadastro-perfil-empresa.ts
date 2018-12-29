import { Component, ViewChild, Sanitizer } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { ImagemCatalogo, CadastroPerfilModel } from '../../../models/empresa.model';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';
import { EmpresaLojaProvider } from '../../../providers/empresa-loja/empresa-loja';
import { EmpresaProvider } from '../../../providers/empresa/empresa';

@IonicPage()
@Component({
  selector: 'page-cadastro-perfil-empresa',
  templateUrl: 'cadastro-perfil-empresa.html',
})
export class CadastroPerfilEmpresaPage {

  @ViewChild('fileInput') fileInput;
  @ViewChild('slides') Slides: Slides;

  perfil: CadastroPerfilModel = new CadastroPerfilModel();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private utilitarios: UtilitariosProvider,
    private sanitizer: Sanitizer,
    private empresaLojaProvider: EmpresaLojaProvider,
    private empresaProvider: EmpresaProvider) {
    this.empresaLojaProvider;
    this.empresaProvider;
    this.sanitizer;
    var perfilViaParams = this.navParams.get("perfil");
    if (perfilViaParams)
      this.perfil = perfilViaParams;
  }

  ionViewDidLoad() {
  }

  aoEscolherImagem(event: any) {

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      if (!this.perfil.Catalogo[this.perfil.Catalogo.length])
        this.perfil.Catalogo[this.perfil.Catalogo.length] = new ImagemCatalogo();

      this.utilitarios.getBase64Image((readerEvent.target as any).result, (imagem) => {
        this.perfil.Catalogo[this.perfil.Catalogo.length - 1].Imagem = imagem;
      })
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  removaImagem(i: number) {
    this.perfil.Catalogo.splice(i, 1);
    this.Slides.slidePrev();
  }

  salvar() {

    if (this.perfil.IdPerfilEmpresa > 0) {
      this.empresaLojaProvider.atualizePerfilEmpresa(this.perfil)
        .then(() => {
          this.utilitarios.mostreToast("Perfil atualizado com sucesso");
          this.navCtrl.pop();
        })
        .catch(()=>{

        });
    }
    else {
      this.empresaLojaProvider.cadastrePerfilEmpresa(this.perfil)
        .then(() => {
          this.utilitarios.mostreToast("Perfil adicionado com sucesso");
          this.navCtrl.pop();
        })
        .catch(()=>{

        });
    }
  }

  voltar() {
    this.navCtrl.pop();
  }
}
