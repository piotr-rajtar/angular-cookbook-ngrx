import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { authInterceptorProvider } from './app/auth/router/interceptors';
import { routes } from './app/router/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    authInterceptorProvider
  ],
}).catch(err => console.error(err));
