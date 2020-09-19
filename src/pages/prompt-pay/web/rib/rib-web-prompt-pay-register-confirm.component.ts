import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../../../share/service/constants';
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { PermissionAction } from '../../../../share/service/permission.service';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { PromptPayRegisterConfirmComponent } from '../../prompt-pay-register-confirm.component';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';

@Component({
  selector: 'rib-web-prompt-pay-register-confirm',
  templateUrl: '../../prompt-pay-register-confirm.html'
})
export class RIBWebPromptPayRegisterConfirmComponent extends PromptPayRegisterConfirmComponent {
  stepwizardStyle: string = this.constants.STYLE_RIB_WEB;

  constructor(public otpService: OtpService,
    public constants: Constants,
    public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public permissionAction: PermissionAction,
    public permissionChangeRoute: PermissionChangeRoute,
    public translate: TranslateService) {
    super(otpService, constants, promptPayRegisterServiceMain, permissionAction, permissionChangeRoute, translate);
  }
}