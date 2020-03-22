import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { DadosEmpresaAdmin, AtualizeContaModel, Perfil } from '../../../models/empresa.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageProvider } from '../../../providers/storage/storage';
import { UtilitariosProvider } from '../../../providers/utilitarios/utilitarios';

@IonicPage()
@Component({
  selector: 'page-conta-empresa',
  templateUrl: 'conta-empresa.html',
})


export class ContaEmpresaPage {

  @ViewChild('fileInput') fileInput;

  form: FormGroup;
  dadosEmpresa: DadosEmpresaAdmin;
  novaImagem: any;

  constructor(public navCtrl: NavController,
    formBuilder: FormBuilder,
    public navParams: NavParams,
    private app:App,
    private storageEmpresa: StorageEmpresaProvider,
    private storage: StorageProvider,
    private utilitarios: UtilitariosProvider,
    private empresaProvider: EmpresaProvider) {
    this.empresaProvider;

    this.form = formBuilder.group({
      resumo: ['', Validators.required],
      valorPontos: ['', Validators.required]
    });
  }

  ionViewDidLoad() {

    this.empresaProvider.obtenhaDadosEmpresaAdmin()
      .then((retorno: DadosEmpresaAdmin) => {
        this.dadosEmpresa = retorno;
      });
  }

  selecioneImagem() {
    this.fileInput.nativeElement.click();
  }

  aoEscolherImagem(event: any) {
    debugger;
    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      this.novaImagem = (readerEvent.target as any).result;
      (document.getElementsByClassName("thumbnail")[0] as any).src = this.novaImagem; 
    };

    if (event.target.files.length > 0) 
      reader.readAsDataURL(event.target.files[0]);
  }

  salvar() {

    let conta: AtualizeContaModel = new AtualizeContaModel();
    conta.Categorias = [0, 1];
    conta.Resumo = this.dadosEmpresa.Conta.Resumo;
    conta.ValorPontos = this.dadosEmpresa.Conta.ValorPontos;
    conta.IdEmpresa = this.dadosEmpresa.Empresa.IdEmpresa;
    conta.Logo = this.novaImagem.split(",")[1];

    this.utilitarios.mostreAlertaCarregando("Salvando, aguarde um instante.");
    this.empresaProvider.atualizeConta(conta)
      .then(() => {
        this.storageEmpresa.armazeneDadosEmpresaAdmin(this.dadosEmpresa);
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemSucesso("Dados salvos com sucesso");
        this.navCtrl.pop();
      })
      .catch((retorno) => {
        retorno;
        this.navCtrl.pop();
        this.utilitarios.removaAlertaCarregando();
        this.utilitarios.mostreMensagemErro("Houve um erro ao salvar os dados, tente novamente");
      })
  }

  adicioneNovoPerfil() {
    this.app.getRootNavs()[0].push("CadastroPerfilEmpresaPage")
  }

  abraAtualizacaoPerfil(perfil: Perfil) {
    this.app.getRootNavs()[0].push("CadastroPerfilEmpresaPage", { perfil: perfil });
  }

  sair() {
    this.storage.limpeTudo();
    this.navCtrl.setRoot("LoginEmpresaPage");
  }

  voltar() {
    this.navCtrl.pop();
  }
}