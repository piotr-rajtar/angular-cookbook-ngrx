import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

import { AppComponent } from './app.component';

import { AppHeader } from './appHeader/appHeader.component';
import { AuthComponent } from './auth/auth.component';

import { authInterceptorProvider } from './router/interceptors';

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
    FormsModule,
    HttpClientModule,
    RecipesModule,
    SharedModule,
    ShoppingModule,
  ],
  providers: [
    authInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
