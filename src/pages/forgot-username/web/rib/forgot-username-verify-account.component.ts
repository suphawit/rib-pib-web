import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotUsernameService } from './forgot-username.service';
import { CardInfoBean } from '../../../../share/bean/card-info-bean';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-username-verify-account',
  template: '<verify-account-form [cardInfo]="cardInfo" (onClickSubmit)="onClickSubmit($event)"></verify-account-form>'
})
// Component class
export class ForgotUsernameVerifyAccountComponent implements ForgotUsernameVerifyAccount, OnInit {
  cardInfo: CardInfoBean;

  constructor(
    @Inject(Router) public router: Router,
    public forgotUsernameService: ForgotUsernameService,
    public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute) {

    if (permissionChangeRoute.targetAction === 'forgot-username/verify-account') {
      permissionChangeRoute.targetAction = null;
    } else {
      forgotUsernameService.cardInfo = null;
      permissionChangeRoute.changeRoute("HOME");
    }
  }

  ngOnInit(): void {
    this.forgotUsernameService.updateObserver([
      { key: 'stepwizard', value: 2 },
      { key: 'alertmessage', value: '' }
    ]);

    this.cardInfo = this.forgotUsernameService.cardInfo;
  }

  onClickSubmit(data: any): void {
    

    if (data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
      this.forgotUsernameService.username = data.value;
      this.permissionChangeRoute.targetAction = 'forgot-username/result';
      this.router.navigate(['forgot-username/result']);
    } else {
      this.forgotUsernameService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
    }
  }
}

interface ForgotUsernameVerifyAccount {
  cardInfo: CardInfoBean;
  onClickSubmit: Function;
}