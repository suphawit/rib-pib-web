import { Component, OnInit, Input } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { ValidateService } from './validate.service';

@Component({
  selector: 'validate',
  template: '<ngb-alert *ngIf="errorMessages && errorMessages.length > 0"><div *ngFor="let message of errorMessages">{{message}}</div></ngb-alert>',
  providers: [ValidateService]
})
// Component class
export class ValidateComponent implements OnInit {
  @Input('errorMsg') errorMessages: Array<string>;

  constructor(alertConfig: NgbAlertConfig, private ValidateService: ValidateService) {
    alertConfig.type = 'danger';
    alertConfig.dismissible = true;
  }

  ngOnInit(): void {
  }

}