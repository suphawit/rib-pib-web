import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotResetPasswordService } from './forgot-reset-password.service';
import { CardInfoBean } from '../../../../share/bean/card-info-bean';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-reset-password-reset-password',
  template: '<reset-password-form [cardInfo]="cardInfo" (onClickSubmit)="onClickSubmit($event)"></reset-password-form>'
})
// Component class
export class ForgotResetPasswordResetPasswordComponent implements OnInit, ForgotResetPasswordResetPassword {
  cardInfo: CardInfoBean;
  messageModalData: { title: string; body: string; action: any; config: any; };

  constructor(
    @Inject(Router) public router: Router,
    public forgotResetPasswordService: ForgotResetPasswordService,
    public constants: Constants,
    public permissionChangeRoute: PermissionChangeRoute
  ) {
    if (permissionChangeRoute.targetAction === 'forgot-reset-password/reset-password') {
      permissionChangeRoute.targetAction = null;
    } else {
      permissionChangeRoute.changeRoute("HOME");
      this.forgotResetPasswordService.cardInfo = null;
    }
  }

  ngOnInit(): void {
    this.forgotResetPasswordService.updateObserver([
      { key: 'radiobutton', value: 'have' },
      { key: 'stepwizard', value: 2 },
      { key: 'alertmessage', value: '' }
    ]);

    this.cardInfo = this.forgotResetPasswordService.cardInfo;

    this.messageModalData = {
      title: 'label.Success',
      body: 'label.resetPassSuccess',
      action: {
        name: 'route',
        value: ['']
      },
      config: { isShowCloseBtn: true }
    };
  }

  onClickSubmit(data: any): void {
    if (data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
      this.forgotResetPasswordService.cardInfo = data;
      this.forgotResetPasswordService.updateObserver([
        { key: 'radiobutton', value: 'have' },
        { key: 'alertmessage', value: '' },
        { key: 'modal', value: this.messageModalData }
      ]);
    } else {
      this.forgotResetPasswordService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
    }
  }
}

interface ForgotResetPasswordResetPassword {
  onClickSubmit: Function;
  cardInfo: CardInfoBean;
  messageModalData: { title: string; body: string; action: any; };
}