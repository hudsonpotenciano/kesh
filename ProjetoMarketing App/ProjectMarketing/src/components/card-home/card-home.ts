import { Component, Input } from '@angular/core';
import { DadosPessoaEmpresa } from '../../models/pessoa.model';
import { EmpresaLojaProvider } from '../../providers/empresa-loja/empresa-loja';

@Component({
  selector: 'card-home',
  templateUrl: 'card-home.html'
})
export class CardHomeComponent {

  @Input() empresas: string = "";
  empresasObject: DadosPessoaEmpresa[] = [];

  constructor(private empresaLojaProvider: EmpresaLojaProvider) {
    this.empresaLojaProvider;
    this.empresasObject = [];
    this.empresas = "";
  }

  ngOnChanges(changes: any) {
    if (changes.empresas.currentValue)
      this.empresasObject = JSON.parse(changes.empresas.currentValue);
  }

  vireOCard(id: number) {
    document.getElementById(id.toString()).classList.toggle("flipped");
  }
}
