import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';
import { DadosPessoaEmpresa, Pessoa } from '../../models/pessoa.model';

@Injectable()
export class StoragePessoaProvider {

    DADOS_PESSOA = "DADOS_PESSOA";
    DADOS_PESSOA_EMPRESAS = "DADOS_PESSOA_EMPRESAS";


    constructor(private storage: StorageProvider) { }

    atualizeDadosPessoaEmpresa(value: DadosPessoaEmpresa) {

        var dados = this.recupereDadosPessoaEmpresas();
        dados.filter(p => p.Empresa.IdEmpresa == value.Empresa.IdEmpresa).forEach(element => {
            element;
            element = value;
        });

        this.armazeneDadosPessoaEmpresa(dados);
    }

    //Dados Pessoa
    armazeneDadosPessoa(value: Pessoa[]) {
        this.storage.armazene(this.DADOS_PESSOA, value);
    }

    recupereDadosPessoa(): Pessoa {
        return this.storage.recupere(this.DADOS_PESSOA);
    }

    removaDadosPessoa() {
        this.storage.remova(this.DADOS_PESSOA);
    }

    //Dados Pessoa Empresa
    armazeneDadosPessoaEmpresa(value: DadosPessoaEmpresa[]) {
        this.storage.armazene(this.DADOS_PESSOA_EMPRESAS, value);
    }

    recupereDadosPessoaEmpresa(idEmpresa: number): DadosPessoaEmpresa {
        let dados = this.recupereDadosPessoaEmpresas();
        return dados.find(p => p.Empresa.IdEmpresa == idEmpresa);
    }

    recupereDadosPessoaEmpresas(): DadosPessoaEmpresa[] {
        return this.storage.recupere(this.DADOS_PESSOA_EMPRESAS);
    }

    removaDadosPessoaEmpresa() {
        this.storage.remova(this.DADOS_PESSOA_EMPRESAS);
    }
}