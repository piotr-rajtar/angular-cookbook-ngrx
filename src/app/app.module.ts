import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    //COMPONENTS
    AppComponent,
    AppHeader,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    //BROWSER MODULE POWINIEN BYĆ ZAIMPORTOWANY RAZ TYLKO W GŁÓWNYM MODULE
    //DO KAŻDEGO INNEGO MODUŁU, ZAMIAST NIEGO IMMPORTUJEMY COMMON MODULE
    BrowserModule,
    //CORE MODULE STOSUJEMY DLA WSSZELKIEGO RODZAJU PROVIDERÓW JAK NP. INTERCEPTORY CZY SERWISY
    CoreModule,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    SharedModule,
    ShoppingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
