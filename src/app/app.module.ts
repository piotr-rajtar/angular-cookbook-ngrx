import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    //BROWSER MODULE POWINIEN BYĆ ZAIMPORTOWANY RAZ TYLKO W GŁÓWNYM MODULE
    //DO KAŻDEGO INNEGO MODUŁU, ZAMIAST NIEGO IMPORTUJEMY COMMON MODULE
    BrowserModule,
    //CORE MODULE STOSUJEMY DLA WSZELKIEGO RODZAJU PROVIDERÓW JAK NP. INTERCEPTORY CZY SERWISY
    CoreModule,
    //HTTPCLIENT MODULE POWINIEN BYĆ ZAWSZE W APP MODULE
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
