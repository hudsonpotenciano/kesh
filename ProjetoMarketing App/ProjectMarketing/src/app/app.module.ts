import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClient, HttpClientModule } from '@angular/common/http';

//Translate
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { MyApp } from './app.component';
import { ComunicacaoProvider } from '../providers/comunicacao/comunicacao';
import { MylocalStorageProvider } from '../providers/mylocal-storage/mylocal-storage';
import { PessoaProvider } from '../providers/pessoa/pessoa';
import { EmpresaProvider } from '../providers/empresa/empresa';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/linguagens/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ComunicacaoProvider,
    MylocalStorageProvider,
    PessoaProvider,
    EmpresaProvider
  ]
})

export class AppModule { }
