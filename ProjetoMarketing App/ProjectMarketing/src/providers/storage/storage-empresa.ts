import { Injectable } from '@angular/core';
import { DadosEmpresa } from '../../models/empresa.model';
import { StorageProvider } from './storage';

@Injectable()
export class StorageEmpresaProvider {

    DADOS_EMPRESA = "EMPRESA_DADOS_EMPRESA"
    //KEYS 

    constructor(private storage: StorageProvider) {
    }

    //DADOS EMPRESA
    armazeneDadosEmpresa(value: DadosEmpresa) {
        this.storage.armazene(this.DADOS_EMPRESA, value);
    }

    recupereDadosEmpresa(): DadosEmpresa {
        return this.storage.recupere(this.DADOS_EMPRESA);
    }

    removaDadosEmpresa() {
        this.storage.remova(this.DADOS_EMPRESA);
    }
}