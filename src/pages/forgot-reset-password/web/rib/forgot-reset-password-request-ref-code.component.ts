import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForgotResetPasswordService } from './forgot-reset-password.service';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';

@Component({
  selector: 'forgot-reset-password-request-ref-code',
  template: '<request-reference-form [accentColor]="\'#594F74\'" (onGetReqRefData)="onGetReqRefData($event)"></request-reference-form>'
})
// Component class
export class ForgotResetPasswordRequestRefCodeComponent implements ForgotResetPasswordRequestRefCodeInput, OnInit {
    constructor(
      @Inject(Router) public router: Router, 
      public forgotResetPasswordService: ForgotResetPasswordService, 
      private constants: Constants,
      public permissionChangeRoute: PermissionChangeRoute
    ) {}
  
    messageModalData: { title:string; body:string; action:any; config:any;};

    ngOnInit(): void {
      this.forgotResetPasswordService.updateObserver([
        { key: 'radiobutton', value: 'donot' },
        { key: 'stepwizard', value: 0 },
        { key: 'alertmessage', value: '' }
      ]);

      this.messageModalData = {
        title: 'label.Success', 
        body: 'label.verifyCustSuccess', 
        action: {
          name: 'route',
          value: ['forgot-reset-password/verify-refcode']
        },
       config: {isShowCloseBtn: true }
      };
    }

    onGetReqRefData(data: any): void {
      if(data.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS){
        this.permissionChangeRoute.targetAction = 'forgot-reset-password/verify-refcode';
        this.forgotResetPasswordService.cardInfo = data;
        this.forgotResetPasswordService.updateObserver([
          { key: 'radiobutton', value: 'have' }, 
          { key: 'alertmessage', value: '' },
          { key: 'modal', value: this.messageModalData }
        ]);
      }else{
        this.forgotResetPasswordService.updateObserver([{ key: 'alertmessage', value: data.responseStatus.errorMessage }]);
      }
      
      
    }
}

interface ForgotResetPasswordRequestRefCodeInput {
  onGetReqRefData: Function;
  messageModalData: { title:string; body:string; action:any; };
}