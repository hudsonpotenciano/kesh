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
