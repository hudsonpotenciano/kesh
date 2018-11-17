import { Component } from '@angular/core';

@Component({
  selector: 'lista-vazia',
  templateUrl: 'lista-vazia.html'
})
export class ListaVaziaComponent {

  text: string;

  constructor() {
    console.log('Hello ListaVaziaComponent Component');
    this.text = 'Hello World';
  }

}
