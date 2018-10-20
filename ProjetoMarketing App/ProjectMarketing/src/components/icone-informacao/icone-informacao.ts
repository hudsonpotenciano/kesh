import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UtilitariosProvider } from '../../providers/utilitarios/utilitarios';
import { TranslatePipe, TranslateService } from '../../../node_modules/@ngx-translate/core';

@Component({
  selector: 'icone-informacao',
  templateUrl: 'icone-informacao.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IconeInformacao {

  @Input() id: string;
  dictionaryInfo: { id: string, chaveTraducao: string }[] = [{
    id: 'CATEGORIA', chaveTraducao: "INFO-CATEGORIAS"
  }, {
    id: 'PONTOS',
    chaveTraducao: "INFO-PONTOS"
  }];

  constructor(private utilitarioProvider: UtilitariosProvider,
    private translateService: TranslateService,
    private ref: ChangeDetectorRef) {
  }

  mostreInformacao(event: any) {
    var pipe = new TranslatePipe(this.translateService, this.ref);
    let texto = pipe.transform(this.dictionaryInfo.find(a => a.id == this.id).chaveTraducao)
    this.utilitarioProvider.mestrePopInformacao(texto, event);
  }
}
