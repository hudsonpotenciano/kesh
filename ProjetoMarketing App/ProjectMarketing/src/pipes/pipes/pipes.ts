import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'Data',
})
export class Data implements PipeTransform {

  transform(data: string) {
    if (data)
      return new Date(data).toLocaleDateString();
  }
}

@Pipe({
  name: 'SplitPrimeiro',
})
export class SplitPrimeiro implements PipeTransform {

  transform(texto: string) {
    if (texto && texto.trim() != "")
      return texto.split(" ")[0];
  }
}

