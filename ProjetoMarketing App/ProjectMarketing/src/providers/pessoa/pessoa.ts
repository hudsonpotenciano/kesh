import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel, Pessoa, DadosPessoaEmpresa, CadastroPessoaRedeSocialModel, UnidadeDeMedidaLocalizacao } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin, SocialUser, Localizacao } from '../../models/models.model';
import { StoragePessoaProvider } from '../storage/storage-pessoa';
import { NotaComentarioPessoaEmpresa } from '../../models/empresa.model';

@Injectable()
export class PessoaProvider {

  dadosAcesso: RetornoLogin;

  constructor(private storage: StorageProvider,
    private storagePessoa: StoragePessoaProvider,
    private comunicacao: ComunicacaoProvider) {
    this.dadosAcesso = this.storage.recupereDadosAcesso();
  }

  obtenhaPessoaEPerfilEmpresas(localizacao: Localizacao) {

    let unidadeDeMedida = this.storage.recupereUnidadeDeMedidaLocalizacao();
    unidadeDeMedida = unidadeDeMedida ? unidadeDeMedida : UnidadeDeMedidaLocalizacao.Kilometros;

    return new Promise<DadosPessoaEmpresa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaEPerfilEmpresas",
        { IdPessoa: this.dadosAcesso.IdPessoa, Latitude: localizacao.Latitude, Longitude: localizacao.Longitude, UnidadeDeMedida: unidadeDeMedida })
        .then((retorno: RetornoRequestModel) => {

          let dados = retorno.Result as DadosPessoaEmpresa[];

          resolve(dados);

          this.storagePessoa.armazeneDadosPessoaEmpresa(dados);
        });
    });
  }

  obtenhaFakePessoaEPerfilEmpresas() {
    let latitude = -16.60150553;
    let longitude = -49.30649101;

    return new Promise<number>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaFakePessoaEPerfilEmpresas",
        { IdPessoa: this.dadosAcesso.IdPessoa, Latitude: latitude, Longitude: longitude })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  obtenhaPessoasCompartilhamento(idPerfilEmpresa: number) {

    let latitude = -16.60150553;
    let longitude = -49.30649101;

    return new Promise<Pessoa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaParaCompartilhamento",
        { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa, Latitude: latitude, Longitude: longitude })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaComentarioENotaPessoasEmpresas(idPerfilEmpresa: number) {

    return new Promise<NotaComentarioPessoaEmpresa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaComentarioENotaPessoasEmpresas",
        { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  atualizeDadosPessoaEmpresa(idPerfilEmpresa: number, comentario: string, nota: number) {

    return this.comunicacao.post("Pessoa/Pessoa/AtualizeDadosPessoaEmpresa",
      { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa, comentario: comentario, Nota: nota });
  }

  ObtenhaDadosPessoa() {

    return new Promise<Pessoa>(resolve => {

      this.comunicacao.post("pessoa/pessoa/ObtenhaDadosPessoa", { IdPessoa: this.dadosAcesso.IdPessoa })
        .then((resposta: RetornoRequestModel) => {
          resolve(resposta.Result);
          this.storagePessoa.armazeneDadosPessoa(resposta.Result);
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

  realizeLoginRedeSocial(usuario: SocialUser) {

    return this.comunicacao.post("pessoa/login/RealizeLoginRedeSocial", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }

  cadastrePessoa(pessoa: CadastroPessoaModel) {

    return new Promise(resolve => {

      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
        .then((resposta: RetornoRequestModel) => {
          resolve();
          this.storage.armazeneDadosAcesso(resposta);
        })
        .catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            alert("Este Email já está cadastrado");
          };
        });
    });
  }

  cadastrePessoaRedeSocial(pessoa: CadastroPessoaRedeSocialModel) {

    return new Promise(resolve => {

      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoaRedeSocial", pessoa)
        .then((resposta: RetornoRequestModel) => {
          resolve();
          this.storage.armazeneDadosAcesso(resposta);
        })
        .catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            alert("Este Email já está cadastrado");
          };
        });
    });
  }

  obtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }
}
