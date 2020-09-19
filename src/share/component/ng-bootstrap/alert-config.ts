import {Component, Input} from '@angular/core';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-alert-config',
  template: '<ngb-alert *ngIf="messages && messages.length > 0"><div *ngFor="let message of messages">{{message}}</div></ngb-alert>',
  providers: [NgbAlertConfig]
})
export class NgbdAlertConfig {
  @Input('errorMsg') messages: Array<string>;
  constructor(alertConfig: NgbAlertConfig) {
    alertConfig.type = 'danger';
    alertConfig.dismissible = true;
  }
}