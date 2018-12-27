import { Injectable } from '@angular/core';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { CadastroPessoaModel, Pessoa, DadosPessoaEmpresa, CadastroPessoaRedeSocialModel, UnidadeDeMedidaLocalizacao, PessoaLoja } from '../../models/pessoa.model';
import { StorageProvider } from '../storage/storage';
import { User, RetornoRequestModel, RetornoLogin, SocialUser, Localizacao } from '../../models/models.model';
import { StoragePessoaProvider } from '../storage/storage-pessoa';
import { NotaComentarioPessoaEmpresa } from '../../models/empresa.model';
import { EnumeradorDeCacheStoragePessoa, Enumerador } from '../../models/enumeradores.model';
import { LoadingController } from 'ionic-angular';
import { UtilitariosProvider } from '../utilitarios/utilitarios';

@Injectable()
export class PessoaProvider {

  dadosAcesso: RetornoLogin;
  loadingPrimeiroCarregamento = null;

  constructor(private storage: StorageProvider,
    private loadingCtrl: LoadingController,
    private storagePessoa: StoragePessoaProvider,
    private utilitariosProvider: UtilitariosProvider,
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
            this.storagePessoa.armazeneDadosPessoaLojas(retorno.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
            resolve(retorno.Result);
          }).catch((retorno) => {
            reject(retorno);
          });
      });
    }
  }

  obtenhaPessoaEPerfilEmpresas(localizacao: Localizacao, desconsiderarCache: boolean = false): Promise<DadosPessoaEmpresa[]> {
    var dadosSalvos = this.storagePessoa.recupereDadosPessoaEmpresas();
    var enumeradorDeCache = new EnumeradorDeCacheStoragePessoa().obtenhaPessoaEPerfilEmpresas;
    if ((!navigator.onLine) || !desconsiderarCache && this.estaEmCach(enumeradorDeCache)) {
      this.utilitariosProvider.localizacao = localizacao;
      return new Promise<DadosPessoaEmpresa[]>(resolve => {
        resolve(dadosSalvos.sort((a, b) => {
          var distancia1 = this.utilitariosProvider.calculeDistancia(a.Perfil.Latitude, a.Perfil.Longitude);
          var distancia2 = this.utilitariosProvider.calculeDistancia(b.Perfil.Latitude, b.Perfil.Longitude);
          return distancia1 - distancia2;
        }));
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
            this.storagePessoa.armazeneDadosPessoaEmpresas(dados);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
            resolve(dados);
            if (this.loadingPrimeiroCarregamento != null) this.loadingPrimeiroCarregamento.dismiss();
          }).catch((retorno) => {
            reject(retorno);
          })
      });
    }
  }

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
    var dados = this.storagePessoa.recupereComentariosENotas(idPerfilEmpresa);
    if (this.estaEmCach(enumeradorDeCache) && dados.length > 0) {
      return new Promise<NotaComentarioPessoaEmpresa[]>(resolve => {
        resolve(dados);
      });
    }
    else {
      return new Promise<NotaComentarioPessoaEmpresa[]>((resolve, reject) => {
        this.comunicacao.post("Pessoa/Pessoa/ObtenhaComentarioENotaPessoasEmpresas",
          { IdPessoa: this.dadosAcesso.IdPessoa, IdPerfilEmpresa: idPerfilEmpresa })
          .then((retorno: RetornoRequestModel) => {
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime());
            this.storagePessoa.armazeneComentariosENotas(retorno.Result);
            resolve(retorno.Result);
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
        content: 'Carregando lojas...'
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
            this.storagePessoa.armazeneDadosPessoa(resposta.Result);
            this.storage.armazene(enumeradorDeCache.Descricao, new Date().getTime())
            resolve(resposta.Result);
          }).catch((retorno) => {
            reject(retorno);
          })
      });
    }
  }

  realizeLogin(usuario: User) {

    this.utilitariosProvider.mostreAlertaCarregando("Buscando seus dados, aguarde um instante");

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
        this.utilitariosProvider.removaAlertaCarregando();
      }).catch((retorno) => {
        reject(retorno);
        this.utilitariosProvider.removaAlertaCarregando();
        this.utilitariosProvider.mostreMensagemErro("Usuario ou senha não encontrados");
      })
    });
  }

  desloguePessoa() {
    var dadosAcesso = this.storage.recupereDadosAcesso();
    this.comunicacao.post("pessoa/login/DesloguePessoa", { IdNotificao: this.storage.recupereIdNotificacao(), IdPerfilEmpresa: 0, IdPessoa: dadosAcesso.IdPessoa });
  }

  realizeLoginRedeSocial(usuario: SocialUser) {

    this.utilitariosProvider.mostreAlertaCarregando("Buscando seus dados, aguarde um instante");

    return new Promise<any>((resolve, reject) => {
      this.comunicacao.post("pessoa/login/RealizeLoginRedeSocial", {
        Email: usuario.Email,
        Id: usuario.Id,
        TokenNotificacao: this.storage.recupereIdNotificacao()
      }).then((resposta: RetornoRequestModel) => {
        this.storage.armazeneDadosAcesso(resposta.Result);
        resolve(resposta.Result);
        this.utilitariosProvider.removaAlertaCarregando();
      }).catch((retorno) => {
        this.utilitariosProvider.removaAlertaCarregando();
        this.utilitariosProvider.mostreMensagemErro("Usuario ou senha não encontrados");
        reject(retorno);
      })
    });
  }

  cadastrePessoa(pessoa: CadastroPessoaModel) {

    this.utilitariosProvider.mostreAlertaCarregando();

    return new Promise((resolve, reject) => {
      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoa", pessoa)
        .then((resposta: RetornoRequestModel) => {
          this.storage.armazeneDadosAcesso(resposta.Result);
          resolve();
          this.utilitariosProvider.removaAlertaCarregando();
        }).catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            this.utilitariosProvider.removaAlertaCarregando();
            this.utilitariosProvider.mostreMensagemErro("Este email já está cadastrado, tente utilizar outro ou realize o login");
            reject(resposta);
          };
        });
    });
  }

  cadastrePessoaRedeSocial(pessoa: CadastroPessoaRedeSocialModel) {

    this.utilitariosProvider.mostreAlertaCarregando();

    return new Promise((resolve, reject) => {
      this.comunicacao.post("Pessoa/Pessoa/CadastrePessoaRedeSocial", pessoa)
        .then((resposta: RetornoRequestModel) => {
          this.storage.armazeneDadosAcesso(resposta.Result);
          resolve();
          this.utilitariosProvider.removaAlertaCarregando();
        })
        .catch((resposta: RetornoRequestModel) => {
          if (resposta.Erro == 2) {
            this.utilitariosProvider.removaAlertaCarregando();
            this.utilitariosProvider.mostreMensagemErro("Este email já está cadastrado, tente utilizar outro ou realize o login");
            reject(resposta);
          };
        });
    });
  }

  obtenhaFotoPessoa(idPessoa: number) {
    return "https://keshstorage.blob.core.windows.net/perfilpessoa/" + idPessoa + ".jpg";
    //return ComunicacaoSettings.UrlApiBase + "Pessoa/Pessoa/ObtenhaFotoPessoa?idPessoa=" + idPessoa;
  }

  estaEmCach(enumerador: Enumerador) {
    var cache = this.storage.recupere(enumerador.Descricao);
    if (cache && cache != undefined) {
      return !navigator.onLine || (cache > (new Date().getTime() - ((24 * 60 * 60 * 1000) * 1)))
    }
    return false;
  }
}
