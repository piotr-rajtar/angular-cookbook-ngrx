import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.show')
  @Input('appDropdown') isDropdownOpen!: boolean;
}
