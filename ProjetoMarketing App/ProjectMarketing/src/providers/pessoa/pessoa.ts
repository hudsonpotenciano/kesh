import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { Empresa, PerfilEmpresa } from '../../models/empresa.model';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';

@Injectable()
export class PessoaProvider {

  dadosAcesso: RetornoLogin;

  constructor(private storage: StorageProvider,
    private comunicacao: ComunicacaoProvider) {
    this.dadosAcesso = this.storage.recupereDadosAcesso();
  }

  ObtenhaPessoaEmpresas() {

    return new Promise<Empresa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaEmpresas", { IdPessoa: this.dadosAcesso.IdPessoa })
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

  ObtenhaPerfilEmpresa(idEmpresa: number) {
    return new Promise<PerfilEmpresa>(resolve => {
      this.comunicacao.post("Empresa/Empresa/ObtenhaPerfilEmpresa", { IdEmpresa: idEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  ObtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }
}
