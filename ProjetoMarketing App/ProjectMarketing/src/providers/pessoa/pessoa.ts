import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel, PessoaEmpresa, DadosPessoaPerfilEmpresa, Pessoa } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin } from '../../models/models.model';
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

  obtenhaPessoaEPerfilEmpresas() {

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

  obtenhaPessoasCompartilhamento(idEmpresa: number) {

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

  ObtenhaComentarioENotaPessoasEmpresas(idEmpresa: number) {

    return new Promise<NotaComentarioPessoaEmpresa[]>(resolve => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaComentarioENotaPessoasEmpresas",
        { IdPessoa: this.dadosAcesso.IdPessoa, IdEmpresa: idEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  atualizeDadosPessoaEmpresa(idEmpresa: number, comentario: string, nota: number) {

    return this.comunicacao.post("Pessoa/Pessoa/AtualizeDadosPessoaEmpresa",
      { IdPessoa: this.dadosAcesso.IdPessoa, IdEmpresa: idEmpresa, comentario: comentario, Nota: nota });
  }

  realizeLogin(usuario: User) {

    return this.comunicacao.post("pessoa/login/realizelogin", usuario)
      .then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
      });
  }

  cadastrePessoa(pessoa: CadastroPessoaModel) {

    return this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
      .catch((retorno: RetornoRequestModel) => {
        
        if (retorno && retorno.Erro == 2) {
          alert("Este email já existe");
        };
      });
  }

  obtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }
}
