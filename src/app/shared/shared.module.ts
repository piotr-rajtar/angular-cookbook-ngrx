import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './directives/clickOutside.directive';

import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    //COMPONENTS
    AlertComponent,
    //DIRECTIVES
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    //COMPONENTS
    AlertComponent,
    //DIRECTIVES
    ClickOutsideDirective,
    //MODULES
    CommonModule,
  ],
})
export class SharedModule { }
