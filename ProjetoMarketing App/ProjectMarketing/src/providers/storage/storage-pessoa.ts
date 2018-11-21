import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';
import { DadosPessoaEmpresa, Pessoa, PessoaLoja } from '../../models/pessoa.model';
import { NotaComentarioPessoaEmpresa } from '../../models/empresa.model';

@Injectable()
export class StoragePessoaProvider {

    DADOS_PESSOA = "DADOS_PESSOA";
    COMENTARIOS_NOTAS = "COMENTARIOS_NOTAS";
    DADOS_PESSOA_EMPRESAS = "DADOS_PESSOA_EMPRESAS";
    DADOS_PESSOA_LOJAS = "DADOS_PESSOA_LOJAS";


    constructor(private storage: StorageProvider) { }

    atualizeDadosPessoaEmpresa(value: DadosPessoaEmpresa) {

        var dados = this.recupereDadosPessoaEmpresas();
        dados.filter(p => p.Empresa.IdEmpresa == value.Empresa.IdEmpresa).forEach(element => {
            element;
            element = value;
        });

        this.armazeneDadosPessoaEmpresas(dados);
    }

    //#region ComentariosENotas
    armazeneComentariosENotas(value: NotaComentarioPessoaEmpresa[]) {
        this.storage.armazene(this.COMENTARIOS_NOTAS, value);
    }

    recupereComentariosENotas(): NotaComentarioPessoaEmpresa[] {
        return this.storage.recupere(this.COMENTARIOS_NOTAS);
    }
    
    removaComentariosENotas() {
        this.storage.remova(this.COMENTARIOS_NOTAS);
    }
    //#endregion

    //#region Dados Pessoa
    armazeneDadosPessoa(value: Pessoa[]) {
        this.storage.armazene(this.DADOS_PESSOA, value);
    }

    recupereDadosPessoa(): Pessoa {
        return this.storage.recupere(this.DADOS_PESSOA);
    }

    removaDadosPessoa() {
        this.storage.remova(this.DADOS_PESSOA);
    }
    //#endregion 

    //#region Dados Pessoa Lojas

    armazeneDadosPessoaLojas(value: PessoaLoja[]) {
        this.storage.armazene(this.DADOS_PESSOA_LOJAS, value);
    }

    recupereDadosPessoaLoja(idPerfil: number): PessoaLoja {
        let dados = this.recupereDadosPessoaLojas();
        return dados.find(p => p.Loja.IdPerfilEmpresa == idPerfil);
    }

    recupereDadosPessoaLojas(): PessoaLoja[] {
        return this.storage.recupere(this.DADOS_PESSOA_LOJAS);
    }

    removaDadosPessoaLojas() {
        this.storage.remova(this.DADOS_PESSOA_LOJAS);
    }
    //#endregion

    //#region Dados Pessoa Empresa
    armazeneDadosPessoaEmpresas(value: DadosPessoaEmpresa[]) {
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
    //#endregion
}