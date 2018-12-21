import { Injectable } from '@angular/core';
import { Cupom, RetornoRequestModel, Venda, DTOCupomVenda } from '../../models/models.model';
import { ComunicacaoProvider } from '../comunicacao/comunicacao';
import { VendaAdminLoja } from '../../models/empresa.model';
import { DTOCupomParaVenda, Compartilhamento } from '../../models/pessoa.model';
import { EnumeradorDeCacheStorageTransacoes, Enumerador } from '../../models/enumeradores.model';
import { StorageTransacaoProvider } from '../storage/storage-transacao';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class TransacaoProvider {

  constructor(private comunicacao: ComunicacaoProvider,
    private storageTransacao: StorageTransacaoProvider,
    private storageProvider: StorageProvider) {

  }

  valideCupomExpirado(data: Date) {
    return (new Date(new Date(data).setHours(0, 0, 0, 0)).getTime()) < (new Date(new Date().setHours(0, 0, 0, 0)).getTime());
  }

  GereCupomCompartilhamento(idPessoaReceptor: number, guidCompartilhamento: string) {
    return new Promise<Cupom>((resolve, reject) => {
      this.comunicacao.post("Transacao/GereCupomCompartilhamento",
        { IdPessoaReceptor: idPessoaReceptor, Codigo: guidCompartilhamento })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
          this.storageProvider.remova(new EnumeradorDeCacheStorageTransacoes().obtenhaCuponsEVendasPessoa.Descricao);
        })
        .catch((retorno) => {
          retorno;
          reject();
        });
    });
  }

  gereCodigoDeCompartilhamento(idPerfilEmpresa: number, idPessoa: number, guidCompartilhamento: string) {

    return new Promise<Compartilhamento>((resolve, reject) => {
      this.comunicacao.post("transacao/GereCompartilhamento", {
        IdPerfilEmpresa: idPerfilEmpresa,
        IdPessoa: idPessoa,
        Codigo: guidCompartilhamento
      })
        .then((resposta: RetornoRequestModel) => {
          resolve(resposta.Result);
        })
        .catch(() => {
          reject();
        });
    });
  }

  GereVenda(tokenCupom: string, valorVenda: number, utilizarPontos: boolean) {
    return new Promise<Venda>(resolve => {
      this.comunicacao.post("Transacao/GereVendaComCupom", { TokenCupom: tokenCupom, ValorDaVenda: valorVenda, UsarPontos: utilizarPontos })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  obtenhaCuponsEVendasEmpresaAdmin(IdEmpresa: number) {

    return new Promise<VendaAdminLoja[]>(resolve => {
      var enumerador = new EnumeradorDeCacheStorageTransacoes().obtenhaCuponsEVendasEmpresaAdmin;
      if (this.estaEmCach(enumerador)) {
        resolve(this.storageTransacao.recupereCuponsEVendasEmpresaAdmin());
      }
      else {
        this.comunicacao.post("Transacao/ObtenhaCuponsEVendasEmpresaAdmin", { IdEmpresa: IdEmpresa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storageTransacao.armazeneCuponsEVendasEmpresaAdmin(retorno.Result);
            this.storageProvider.armazene(enumerador.Descricao, new Date().getTime());
          });
      }
    });
  }

  obtenhaCuponsEVendasEmpresa(idPerfilEmpresa: number) {

    return new Promise<any>(resolve => {
      var enumerador = new EnumeradorDeCacheStorageTransacoes().obtenhaCuponsEVendasEmpresa;
      if (this.estaEmCach(enumerador)) {
        resolve(this.storageTransacao.recupereObtenhaCuponsEVendasEmpresa());
      }
      else {
        this.comunicacao.post("Transacao/ObtenhaCuponsEVendasEmpresa", { IdPerfilEmpresa: idPerfilEmpresa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storageTransacao.armazeneObtenhaCuponsEVendasEmpresa(retorno.Result);
            this.storageProvider.armazene(enumerador.Descricao, new Date().getTime());
          });
      }
    });
  }

  ObtenhaCuponsEVendasPessoaEmpresa(idPerfilEmpresa: number, idPessoa: number) {
    return new Promise<any>(resolve => {
      var enumerador = new EnumeradorDeCacheStorageTransacoes().obtenhaCuponsEVendasPessoaEmpresa;
      if (this.estaEmCach(enumerador)) {
        resolve(this.storageTransacao.recupereObtenhaCuponsEVendasPessoaEmpresa());
      }
      else {
        this.comunicacao.post("Transacao/ObtenhaCuponsEVendasPessoaEmpresa", { IdPerfilEmpresa: idPerfilEmpresa, IdPessoa: idPessoa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storageTransacao.armazeneObtenhaCuponsEVendasPessoaEmpresa(retorno.Result);
            this.storageProvider.armazene(enumerador.Descricao, new Date().getTime());
          });
      }
    });
  }

  PessoaPodeCompartilhar(idPerfilEmpresa: number, idPessoa: number) {

    return new Promise<boolean>(resolve => {
      this.comunicacao.post("Transacao/PessoaPodeCompartilhar",
        { IdPessoa: idPessoa, IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        });
    });
  }

  obtenhaCuponsEVendasPessoa(idPessoa: number) {
    return new Promise<DTOCupomVenda[]>(resolve => {
      var enumerador = new EnumeradorDeCacheStorageTransacoes().obtenhaCuponsEVendasPessoa;
      if (this.estaEmCach(enumerador)) {
        resolve(this.storageTransacao.recupereObtenhaCuponsEVendasPessoa());
      }
      else {
        this.comunicacao.post("Transacao/ObtenhaCuponsEVendasPessoa", { IdPessoa: idPessoa })
          .then((retorno: RetornoRequestModel) => {
            resolve(retorno.Result);
            this.storageTransacao.armazeneObtenhaCuponsEVendasPessoa(retorno.Result);
            this.storageProvider.armazene(enumerador.Descricao, new Date().getTime());
          });
      }
    });
  }

  obtenhaCupomPeloToken(token: string, idPerfilEmpresa: number) {
    return new Promise<DTOCupomParaVenda>((resolve, reject) => {
      this.comunicacao.post("Transacao/ObtenhaCupomPeloToken", { CupomToken: token, IdPerfilEmpresa: idPerfilEmpresa })
        .then((retorno: RetornoRequestModel) => {
          resolve(retorno.Result);
        }).catch(() => { reject(); });
    });
  }

  CalculePontos(pontos, valorPontos) {
    if (pontos <= 0 || valorPontos < 1) return 0;
    //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
    return pontos / valorPontos;
  }

  CalculeEquivalente(valorDaVenda, valorPontos) {
    //Calcula quantos pontos valem o dinheiro da venda
    //ValorPontos => Quer dize quantos pontos valem 1 real/dolar...
    return valorDaVenda * valorPontos;
  }

  estaEmCach(enumerador: Enumerador) {
    var cache = this.storageProvider.recupere(enumerador.Descricao);
    if (cache && cache != undefined) {
      return !navigator.onLine || (cache > (new Date().getTime() - ((24 * 60 * 60 * 1000) * 1)))
    }
    return false;
  }
}