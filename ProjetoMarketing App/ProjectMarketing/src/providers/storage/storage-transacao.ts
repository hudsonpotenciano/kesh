import { Injectable } from '@angular/core';
import { Cupom, DTOCupomVenda } from '../../models/models.model';
import { StorageProvider } from './storage';
import { VendaAdminLoja } from '../../models/empresa.model';

@Injectable()
export class StorageTransacaoProvider {

    //KEYS 
    CUPONS = "CUPONS";
    CUPONS_VENDAS_EMPRESA_ADMIN = "CUPONS_VENDAS_EMPRESA_ADMIN";
    CUPONS_VENDAS_PESSOA__EMPRESA = "CUPONS_VENDAS_PESSOA__EMPRESA";
    CUPONS_VENDAS_EMPRESA_LOJA = "CUPONS_VENDAS_EMPRESA_LOJA";
    CUPONS_VENDAS_PESSOA = "CUPONS_VENDAS_PESSOA";

    constructor(private storage: StorageProvider) {
    }

    //CuponsEVendasEmpresaAdmin
    armazeneCuponsEVendasEmpresaAdmin(value: VendaAdminLoja[]) {
        this.storage.armazene(this.CUPONS_VENDAS_EMPRESA_ADMIN, value);
    }

    recupereCuponsEVendasEmpresaAdmin(): VendaAdminLoja[] {
        return this.storage.recupere(this.CUPONS_VENDAS_EMPRESA_ADMIN);
    }

    //obtenhaCuponsEVendasEmpresa
    armazeneObtenhaCuponsEVendasEmpresa(value: VendaAdminLoja[]) {
        this.storage.armazene(this.CUPONS_VENDAS_EMPRESA_LOJA, value);
    }

    recupereObtenhaCuponsEVendasEmpresa(): VendaAdminLoja[] {
        return this.storage.recupere(this.CUPONS_VENDAS_EMPRESA_LOJA);
    }

    //ObtenhaCuponsEVendasPessoaEmpresa
    armazeneObtenhaCuponsEVendasPessoaEmpresa(value: VendaAdminLoja[]) {
        this.storage.armazene(this.CUPONS_VENDAS_PESSOA__EMPRESA, value);
    }

    recupereObtenhaCuponsEVendasPessoaEmpresa(): VendaAdminLoja[] {
        return this.storage.recupere(this.CUPONS_VENDAS_PESSOA__EMPRESA);
    }

    //ObtenhaCuponsEVendasPessoa
    armazeneObtenhaCuponsEVendasPessoa(value: DTOCupomVenda[]) {
        this.storage.armazene(this.CUPONS_VENDAS_PESSOA, value);
    }

    recupereObtenhaCuponsEVendasPessoa(): DTOCupomVenda[] {
        return this.storage.recupere(this.CUPONS_VENDAS_PESSOA);
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