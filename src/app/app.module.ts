import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './router/app-routing.module';
import { DirectivesModule } from './directives/directives.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping/shopping.module';

import { AppComponent } from './app.component';

import { AlertComponent } from './components/alert/alert.component';
import { AppHeader } from './appHeader/appHeader.component';
import { AuthComponent } from './auth/auth.component';

import { authInterceptorProvider } from './router/interceptors';

@NgModule({
  declarations: [
    //COMPONENTS
    AlertComponent,
    AppComponent,
    AppHeader,
    AuthComponent,
  ],
  imports: [
    AppRoutingModule,
    //BROWSER MODULE POWINIEN BYĆ ZAIMPORTOWANY RAZ TYLKO W GŁÓWNYM MODULE
    //DO KAŻDEGO INNEGO MODUŁU, ZAMIAST NIEGO IMMPORTUJEMY COMMON MODULE
    BrowserModule,
    DirectivesModule,
    FormsModule,
    HttpClientModule,
    RecipesModule,
    ShoppingModule,
  ],
  providers: [
    authInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
