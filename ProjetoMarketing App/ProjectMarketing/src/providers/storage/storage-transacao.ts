import { Injectable } from '@angular/core';
import { Cupom } from '../../models/models.model';
import { StorageProvider } from './storage';

@Injectable()
export class StorageTransacaoProvider {

    //KEYS 
    CUPONS = "CUPONS";

    constructor(private storage: StorageProvider) {
    }

    //CUPOM
    armazeneCupom(value: Cupom) {
        var cupons = this.recupereCupons();
        if (!cupons) cupons = [];
        cupons.push(value);
        this.storage.armazene(this.CUPONS, cupons);
    }

    recupereCupons(): Cupom[] {
        return this.storage.recupere(this.CUPONS);
    }

    removaCupons() {
        this.storage.remova(this.CUPONS);
    }
}