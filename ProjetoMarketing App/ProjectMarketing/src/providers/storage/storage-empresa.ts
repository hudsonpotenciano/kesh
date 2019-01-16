import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';
import { DadosEmpresaLoja, DadosEmpresaAdmin, Perfil } from '../../models/empresa.model';

@Injectable()
export class StorageEmpresaProvider {

    DADOS_EMPRESA_LOJA = "EMPRESA_DADOS_EMPRESA";
    DADOS_EMPRESA_ADMIN = "DADOS_EMPRESA_ADMIN";
    PERFIS_EMPRESA = "PERFIS_EMPRESA";
    ID_PERFIL_EMPRESA_SELECIONADO = "PERFIL_EMPRESA_SELECIONADO"

    constructor(private storage: StorageProvider) {
    }

    armazeneIdPerfilEmpresa(value: string) {
        this.storage.armazene(this.ID_PERFIL_EMPRESA_SELECIONADO, value);
    }

    recupereIdPerfilEmpresa(): string {
        return this.storage.recupere(this.ID_PERFIL_EMPRESA_SELECIONADO);
    }

    //DADOS EMPRESA LOJA
    armazeneDadosEmpresaLoja(value: DadosEmpresaLoja) {
        this.storage.armazene(this.DADOS_EMPRESA_LOJA, value);
    }

    recupereDadosEmpresaLoja(): DadosEmpresaLoja {
        return this.storage.recupere(this.DADOS_EMPRESA_LOJA);
    }

    removaDadosEmpresaLoja() {
        this.storage.remova(this.DADOS_EMPRESA_LOJA);
    }

    //DADOS EMPRESA ADMIN
    armazeneDadosEmpresaAdmin(value: DadosEmpresaAdmin) {
        this.storage.armazene(this.DADOS_EMPRESA_ADMIN, value);
    }

    recupereDadosEmpresaAdmin(): DadosEmpresaAdmin {
        return this.storage.recupere(this.DADOS_EMPRESA_ADMIN);
    }

    removaDadosEmpresaAdmin() {
        this.storage.remova(this.DADOS_EMPRESA_ADMIN);
    }


    //DADOS PERFIL EMPRESA
    armazeneDadosPerfilsEmpresa(value: Perfil[]) {
        this.storage.armazene(this.PERFIS_EMPRESA, value);
    }

    recupereDadosPerfilsEmpresa(): Perfil[] {
        return this.storage.recupere(this.PERFIS_EMPRESA);
    }

    removaDadosPerfilsEmpresa() {
        this.storage.remova(this.PERFIS_EMPRESA);
    }
}