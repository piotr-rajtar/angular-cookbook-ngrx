import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AlertType } from '../../models';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input({ required: true }) message!: string;
  @Input({ required: true }) type!: AlertType;

  @Output() close = new EventEmitter<void>();

  get alertTypeClass(): string {
    return this.type === AlertType.DANGER
      ? 'alert-danger'
      : 'alert-success';
  }

  get buttonTypeClass(): string {
    return this.type === AlertType.DANGER
      ? 'btn-danger'
      : 'btn-success';
  }

  closeAlert(): void {
    this.close.emit();
  }
}
