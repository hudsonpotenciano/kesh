import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel, PessoaEmpresa, DadosPessoaPerfilEmpresa, Pessoa } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';
import { StoragePessoaProvider } from '../storage/storage-pessoa';

@Injectable()
export class PessoaProvider {

  dadosAcesso: RetornoLogin;

  constructor(private storage: StorageProvider,
    private storagePessoa: StoragePessoaProvider,
    private comunicacao: ComunicacaoProvider) {
    this.dadosAcesso = this.storage.recupereDadosAcesso();
  }

  ObtenhaPessoaEPerfilEmpresas() {

    let latitude = -16.60150553;
    let longitude = -49.30649101;

    return new Promise<PessoaEmpresa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaEPerfilEmpresas",
        { IdPessoa: this.dadosAcesso.IdPessoa, Latitude: latitude, Longitude: longitude })
        .then((retorno: RetornoRequestModel) => {

          let dados = retorno.Result as DadosPessoaPerfilEmpresa;

          resolve(dados.PessoaEmpresas);

          this.storagePessoa.armazenePessoaEmpresas(dados.PessoaEmpresas);
          this.storagePessoa.armazenePerfilEmpresas(dados.PerfilEmpresas);
        });
    });
  }

  ObtenhaPessoasCompartilhamento(idEmpresa: number) {

    let latitude = -16.60150553;
    let longitude = -49.30649101;

    return new Promise<Pessoa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaParaCompartilhamento",
        { IdPessoa: this.dadosAcesso.IdPessoa, IdEmpresa: idEmpresa, Latitude: latitude, Longitude: longitude })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("pessoa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }

  CadastrePessoa(pessoa: CadastroPessoaModel) {

    return this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
      .then((resposta: RetornoRequestModel) => {

        if (resposta.Erro == 2) {
          alert("Este email já existe");
        }
      });
  }

  // ObtenhaPerfilEmpresa(idEmpresa: number) {
  //   return new Promise<PerfilEmpresa>(resolve => {
  //     this.comunicacao.post("Empresa/Empresa/ObtenhaPerfilEmpresa", { IdEmpresa: idEmpresa })
  //       .then((retorno: RetornoRequestModel) => {
  //         resolve(retorno.Result);
  //       });
  //   });
  // }

  // ObtenhaPerfilEmpresas() {
  //   return new Promise<PerfilEmpresa[]>(resolve => {
  //     this.comunicacao.post("Empresa/Empresa/ObtenhaPerfilEmpresas", {})
  //       .then((retorno: RetornoRequestModel) => {

  //         this.storagePessoa.armazenePerfilEmpresas(retorno.Result);
  //         resolve(retorno.Result);
  //       });
  //   });
  // }

  ObtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }
}
