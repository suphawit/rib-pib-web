import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../../../share/service/AuthGuard';

import { RIBWebPromptPayRegisterConfirmComponent } from './rib-web-prompt-pay-register-confirm.component';
import { RIBWebPromptPayRegisterSuccessComponent } from './rib-web-prompt-pay-register-success.component';
import { RIBWebPromptPayRegisterComponent } from './rib-web-prompt-pay-register.component';

export const ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'rib-web-prompt-pay-register', pathMatch: 'full'
      },
      { path: 'rib-web-prompt-pay-register', component: RIBWebPromptPayRegisterComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY' }, canActivate: [AuthGuard] },
      { path: 'rib-web-prompt-pay-register-confirm', component: RIBWebPromptPayRegisterConfirmComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP2' }, canActivate: [AuthGuard] },
      { path: 'rib-web-prompt-pay-register-success', component: RIBWebPromptPayRegisterSuccessComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP3' }, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PromptPayRoute {
}