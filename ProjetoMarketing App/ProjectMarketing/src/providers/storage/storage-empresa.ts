import { Injectable } from '@angular/core';
import { StorageProvider } from './storage';
import { DadosEmpresaLoja, DadosEmpresaAdmin } from '../../models/empresa.model';

@Injectable()
export class StorageEmpresaProvider {

    DADOS_EMPRESA_LOJA = "EMPRESA_DADOS_EMPRESA"
    ID_PERFIL_EMPRESA_SELECIONADO = "PERFIL_EMPRESA_SELECIONADO"

    //KEYS 

    constructor(private storage: StorageProvider) {
    }

    armazeneIdPerfilEmpresa(value: number) {
        this.storage.armazene(this.ID_PERFIL_EMPRESA_SELECIONADO, value);
    }

    recupereIdPerfilEmpresa(): number {
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
        this.storage.armazene(this.DADOS_EMPRESA_LOJA, value);
    }

    recupereDadosEmpresaAdmin(): DadosEmpresaAdmin {
        return this.storage.recupere(this.DADOS_EMPRESA_LOJA);
    }

    removaDadosEmpresaAdmin() {
        this.storage.remova(this.DADOS_EMPRESA_LOJA);
    }
}