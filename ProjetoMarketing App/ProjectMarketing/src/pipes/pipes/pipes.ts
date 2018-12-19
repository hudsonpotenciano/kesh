import { Pipe, PipeTransform } from '@angular/core';
import { StorageProvider } from '../../providers/storage/storage';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'Data',
})
export class Data implements PipeTransform {

  transform(data: string) {
    var storage = new StorageProvider();
    if (data)
      return new Date(data).toLocaleDateString(storage.recupereCultura());
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

@Pipe({
  name: 'Safe',
})
export class Safe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any): SafeUrl {
    var teste = this.sanitizer.bypassSecurityTrustUrl(value);
    return teste;
  }
}