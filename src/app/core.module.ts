import { NgModule } from '@angular/core';

import { authInterceptorProvider } from './router/interceptors';

@NgModule({
  providers: [
    authInterceptorProvider
  ]
})
export class CoreModule { }
