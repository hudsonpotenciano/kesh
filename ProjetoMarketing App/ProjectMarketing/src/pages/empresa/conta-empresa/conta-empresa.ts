import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { DadosEmpresaAdmin, AtualizeContaModel, Perfil } from '../../../models/empresa.model';
import { StorageEmpresaProvider } from '../../../providers/storage/storage-empresa';
import { EmpresaProvider } from '../../../providers/empresa/empresa';
import { StorageProvider } from '../../../providers/storage/storage';

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
    private storageEmpresa: StorageEmpresaProvider,
    private storage: StorageProvider,
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

    let reader = new FileReader();
    reader.onloadend = (readerEvent) => {

      this.novaImagem = (readerEvent.target as any).result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  atualizeConta() {

    let conta: AtualizeContaModel = new AtualizeContaModel();
    conta.Categorias = [0, 1];
    conta.Resumo = this.dadosEmpresa.Conta.Resumo;
    conta.ValorPontos = this.dadosEmpresa.Conta.ValorPontos;
    conta.IdEmpresa = this.dadosEmpresa.Empresa.IdEmpresa;
    conta.Logo = this.novaImagem.split(",")[1];

    this.empresaProvider.atualizeConta(conta)
      .then(() => {

        this.storageEmpresa.armazeneDadosEmpresaAdmin(this.dadosEmpresa);
      });
  }

  adicioneNovoPerfil() {
    this.navCtrl.push("CadastroPerfilEmpresaPage")
  }

  abraAtualizacaoPerfil(perfil: Perfil) {
    this.navCtrl.push("CadastroPerfilEmpresaPage", { perfil: perfil });
  }

  sair() {
    this.storage.limpeTudo();
    this.navCtrl.setRoot("LoginEmpresaPage");
  }
}

