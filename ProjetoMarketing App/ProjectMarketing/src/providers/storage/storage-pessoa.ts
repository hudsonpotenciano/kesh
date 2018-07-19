import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';
import { PessoaEmpresa } from '../../models/pessoa.model';
import { PerfilEmpresa } from '../../models/empresa.model';

@Injectable()
export class StoragePessoaProvider {

    //CACHE
    // umDiaEmSegundos: number = 86400;

    //KEYS 
    PESSOA_EMPRESAS = "PESSOA_EMPRESAS";
    PERFIL_EMPRESAS = "PERFIL_EMPRESAS";
    // CACHE_1DIA_PESSOAPERFILEMPRESAS = "CACHE_1DIA_PESSOAPERFILEMPRESAS";

    constructor(private storage: StorageProvider) { }

    // PodeAtualizarPessoPerfilEmpresas() {

    //     let cacheSalvo = this.storage.recupere(this.CACHE_1DIA_PESSOAPERFILEMPRESAS);
    //     if (!cacheSalvo) return true;
    //     return Math.abs((new Date().getTime() - cacheSalvo) / 1000) >= this.umDiaEmSegundos;
    // }

    //PessoaEmpresas
    armazenePessoaEmpresas(value: PessoaEmpresa[]) {
        this.storage.armazene(this.PESSOA_EMPRESAS, value);
    }

    atualizePessoaEmpresa(value: PessoaEmpresa) {
        
        var pessoaEmpresas = this.recuperePessoaEmpresas();
        pessoaEmpresas.filter(p => p.Empresa.IdEmpresa == value.Empresa.IdEmpresa).forEach(element => {
            element;
            element = value;
        });
        
        this.armazenePessoaEmpresas(pessoaEmpresas);
    }

    recuperePessoaEmpresas(): PessoaEmpresa[] {
        return this.storage.recupere(this.PESSOA_EMPRESAS);
    }

    recuperePessoaEmpresa(idEmpresa: number): PessoaEmpresa {
        let perfilEmpresas = this.recuperePessoaEmpresas();
        return perfilEmpresas.find(p => p.Empresa.IdEmpresa == idEmpresa);
    }

    removaPessoaEmpresas() {
        this.storage.remova(this.PESSOA_EMPRESAS);
    }

    //PerfilEmpresas
    armazenePerfilEmpresas(value: PerfilEmpresa[]) {
        this.storage.armazene(this.PERFIL_EMPRESAS, value);
    }

    recuperePerfilEmpresas(): PerfilEmpresa[] {
        return this.storage.recupere(this.PERFIL_EMPRESAS);
    }

    recuperePerfilEmpresa(idEmpresa: number): PerfilEmpresa {
        let perfilEmpresas = this.recuperePerfilEmpresas();
        return perfilEmpresas.find(p => p.IdEmpresa == idEmpresa);
    }

    removaPerfilEmpresas() {
        this.storage.remova(this.PERFIL_EMPRESAS);
    }
}