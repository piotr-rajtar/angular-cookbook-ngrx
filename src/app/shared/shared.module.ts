import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    //COMPONENTS
    AlertComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    //COMPONENTS
    AlertComponent,
    //MODULES
    CommonModule,
  ],
})
export class SharedModule { }
