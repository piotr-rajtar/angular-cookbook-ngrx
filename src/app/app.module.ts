import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

import { AppComponent } from './app.component';
import { AppHeader } from './appHeader/appHeader.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
  ],
  imports: [
    AppRoutingModule,
    AuthModule,
    //BROWSER MODULE POWINIEN BYĆ ZAIMPORTOWANY RAZ TYLKO W GŁÓWNYM MODULE
    //DO KAŻDEGO INNEGO MODUŁU, ZAMIAST NIEGO IMPORTUJEMY COMMON MODULE
    BrowserModule,
    //CORE MODULE STOSUJEMY DLA WSSZELKIEGO RODZAJU PROVIDERÓW JAK NP. INTERCEPTORY CZY SERWISY
    CoreModule,
    //HTTPCLIENT MODULE POWINIEN BYĆ ZAWSZE W APP MODULE
    HttpClientModule,
    RecipesModule,
    SharedModule,
    ShoppingModule,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
