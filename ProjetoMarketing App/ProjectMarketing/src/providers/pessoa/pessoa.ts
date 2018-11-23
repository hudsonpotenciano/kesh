import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel, Pessoa, DadosPessoaEmpresa, CadastroPessoaRedeSocialModel, UnidadeDeMedidaLocalizacao, PessoaLoja } from '../../models/pessoa.model';
import { ComunicacaoSettings } from '../../comunicacao.settings';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin, SocialUser, Localizacao } from '../../models/models.model';
import { StoragePessoaProvider } from '../storage/storage-pessoa';
import { NotaComentarioPessoaEmpresa } from '../../models/empresa.model';
import { EnumeradorDeCacheStoragePessoa, Enumerador } from '../../models/enumeradores.model';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class PessoaProvider {

  dadosAcesso: RetornoLogin;
  loadingPrimeiroCarregamento = null;

  constructor(private storage: StorageProvider,
    private loadingCtrl: LoadingController,
    private storagePessoa: StoragePessoaProvider,
    private comunicacao: ComunicacaoProvider) {

    this.dadosAcesso = this.storage.recupereDadosAcesso();
  }

  obtenhaDadosPessoaLojas() {
    var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().obtenhaDadosPessoaLojas;
    if (this.estaEmCach(enumeradorDeCache)) {
      return new Promise<PessoaLoja[]>(resolve => {
        var dados = this.storagePessoa.recupereDadosPessoaLojas();
        resolve(dados);
      });
    }
    else {
      return new Promise<PessoaLoja[]>((resolve, reject) => {
        this.comunicacao.post("Pessoa/Pessoa/ObtenhaDadosPessoaLojas",
          { IdPessoa: this.dadosAcesso.IdPessoa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storagePessoa.armazeneDadosPessoaLojas(retorno.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
          }).catch((retorno) => {
            reject(retorno);
          });
      });
    }
  }

  obtenhaPessoaEPerfilEmpresas(localizacao: Localizacao): Promise<DadosPessoaEmpresa[]> {

    var dadosSalvos = this.storagePessoa.recupereDadosPessoaEmpresas();

    var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().obtenhaPessoaEPerfilEmpresas;
    if (this.estaEmCach(enumeradorDeCache)) {
      return new Promise<DadosPessoaEmpresa[]>(resolve => {
        resolve(dadosSalvos);
      });
    }
    else {
      let unidadeDeMedida = this.storage.recupereUnidadeDeMedidaLocalizacao();
      unidadeDeMedida = unidadeDeMedida ? unidadeDeMedida : UnidadeDeMedidaLocalizacao.Kilometros;
      return new Promise<DadosPessoaEmpresa[]>((resolve, reject) => {

        if (dadosSalvos != null)
          resolve(dadosSalvos);

        this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaEPerfilEmpresas",
          { IdPessoa: this.dadosAcesso.IdPessoa, Latitude: localizacao.Latitude, Longitude: localizacao.Longitude, UnidadeDeMedida: unidadeDeMedida })
          .then((retorno: RetornoRequestModel) => {
            let dados = retorno.Result as DadosPessoaEmpresa[];
            resolve(dados);
            this.storagePessoa.armazeneDadosPessoaEmpresas(dados);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
            if (this.loadingPrimeiroCarregamento != null) this.loadingPrimeiroCarregamento.dismiss();
          }).catch((retorno) => {
            reject(retorno);
          })
      });
    }
  }

  // obtenhaFakePessoaEPerfilEmpresas() {
  //   let latitude = -16.60150553;
  //   let longitude = -49.30649101;

  //   return new Promise<number>(resolve => {
  //     this.comunicacao.post("Pessoa/Pessoa/ObtenhaFakePessoaEPerfilEmpresas",
  //       { IdPessoa: this.dadosAcesso.IdPessoa, Latitude: latitude, Longitude: longitude })
  //       .then((retorno: RetornoRequestModel) => {
  //         resolve(retorno.Result);
  //       });
  //   });
  // }

  obtenhaPessoasCompartilhamento(idPerfilEmpresa: number, localizacao: Localizacao) {

    return new Promise<Pessoa[]>((resolve, reject) => {
      this.comunicacao.post("Pessoa/Pessoa/ObtenhaPessoaParaCompartilhamento",
        { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa, Latitude: localizacao.Latitude, Longitude: localizacao.Longitude })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        }).catch((retorno) => {
          reject(retorno);
        })
    });
  }

  ObtenhaComentarioENotaPessoasEmpresas(idPerfilEmpresa: number) {
    var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().ObtenhaComentarioENotaPessoasEmpresas;
    if (this.estaEmCach(enumeradorDeCache)) {
      return new Promise<NotaComentarioPessoaEmpresa[]>(resolve => {
        var dados = this.storagePessoa.recupereComentariosENotas();
        resolve(dados);
      });
    }
    else {
      return new Promise<NotaComentarioPessoaEmpresa[]>((resolve, reject) => {
        this.comunicacao.post("Pessoa/Pessoa/ObtenhaComentarioENotaPessoasEmpresas",
          { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
            this.storagePessoa.armazeneComentariosENotas(retorno.Result);
          }).catch((retorno) => {
            reject(retorno);
          })
      });
    }
  }

  atualizeDadosPessoaEmpresa(idPerfilEmpresa: number, comentario: string, nota: number) {

    return this.comunicacao.post("Pessoa/Pessoa/AtualizeDadosPessoaEmpresa",
      { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa, comentario: comentario, Nota: nota });
  }

  ObtenhaDadosPessoa() {

    if (this.storagePessoa.recupereDadosPessoa() == null) {
      this.loadingPrimeiroCarregamento = this.loadingCtrl.create({
        content: 'Carregando dados...'
      });
      this.loadingPrimeiroCarregamento.present();
    }
    else
      this.loadingPrimeiroCarregamento = null

    var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().ObtenhaDadosPessoa;
    if (this.estaEmCach(enumeradorDeCache)) {
      return new Promise<Pessoa>(resolve => {
        var dadosPessoa = this.storagePessoa.recupereDadosPessoa();
        resolve(dadosPessoa);
      });
    }
    else {
      return new Promise<Pessoa>((resolve, reject) => {
        this.comunicacao.post("pessoa/pessoa/ObtenhaDadosPessoa", { IdPessoa: this.dadosAcesso.IdPessoa })
          .then((resposta: RetornoRequestModel) => {
            resolve(resposta.Result);
            this.storagePessoa.armazeneDadosPessoa(resposta.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime())
          }).catch((retorno) => {
            reject(retorno);
          })
      });
    }
  }

  realizeLogin(usuario: User) {
    return new Promise<any>((resolve, reject) => {
      this.comunicacao.post("pessoa/login/realizelogin", {
        Login: usuario.Login,
        Senha: usuario.Senha,
        TokenNotificacao: this.storage.recupereIdNotificacao()
      }).then((resposta: RetornoRequestModel) => {
        let result: RetornoLogin = resposta.Result;
        this.storage.armazeneDadosAcesso(result);
        this.dadosAcesso = result;
        resolve(result);
      }).catch((retorno) => {
        reject(retorno);
      })
    });
  }

  realizeLoginRedeSocial(usuario: SocialUser) {
    return new Promise<any>((resolve, reject) => {
      this.comunicacao.post("pessoa/login/RealizeLoginRedeSocial", {
        Email: usuario.Email,
        Id: usuario.Id,
        TokenNotificacao: this.storage.recupereIdNotificacao()
      }).then((resposta: RetornoRequestModel) => {
        resolve(resposta.Result);
        this.storage.armazeneDadosAcesso(resposta.Result);
      }).catch((retorno) => {
        reject(retorno);
      })
    });
  }

  cadastrePessoa(pessoa: CadastroPessoaModel) {
    return new Promise((resolve, reject) => {
      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
        .then((resposta: RetornoRequestModel) => {
          resolve();
          this.storage.armazeneDadosAcesso(resposta);
        }).catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            alert("Este Email já está cadastrado");
            reject(resposta);
          };
        });
    });
  }

  cadastrePessoaRedeSocial(pessoa: CadastroPessoaRedeSocialModel) {
    return new Promise((resolve, reject) => {
      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoaRedeSocial", pessoa)
        .then((resposta: RetornoRequestModel) => {
          resolve();
          this.storage.armazeneDadosAcesso(resposta);
        })
        .catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            alert("Este Email já está cadastrado");
            reject(resposta);
          };
        });
    });
  }

  obtenhaFotoPessoa(idPessoa: number) {
    return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }

  estaEmCach(enumerador: Enumerador) {
    var cache = this.storage.recupere(enumerador.Descricao);
    if (cache && cache != undefined) {
      return !navigator.onLine || (cache < (new Date().getTime() - ((24 * 60 * 60 * 1000) * 1)))
    }
    return false;
  }
}
