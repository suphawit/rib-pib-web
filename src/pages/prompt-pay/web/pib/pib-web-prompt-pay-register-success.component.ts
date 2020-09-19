import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Constants } from '../../../../share/service/constants';
import { PermissionChangeRoute } from '../../../../share/service/permission.service';
import { PromptPayRegisterSuccessComponent } from '../../prompt-pay-register-success.component';
import { PromptPayRegisterServiceMain } from '../../../../pages/prompt-pay/prompt-pay-register.service';

@Component({
  selector: 'pib-web-prompt-pay-register-success',
  templateUrl: '../../prompt-pay-register-success.html'
})
export class PIBWebPromptPayRegisterSuccessComponent extends PromptPayRegisterSuccessComponent {
  stepwizardStyle: string = this.constants.STYLE_PIB_WEB;

  constructor(public constants: Constants,
    public promptPayRegisterServiceMain: PromptPayRegisterServiceMain,
    public permissionChangeRoute: PermissionChangeRoute,
    public translateService: TranslateService) {
    super(constants, promptPayRegisterServiceMain, translateService, permissionChangeRoute);
  }
}