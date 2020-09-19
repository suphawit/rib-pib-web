import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { ChangeTermDepositSwitchTermConfirmComponent } from './change-term-deposit-switch-term-confirm.component';
import { TermDepositConfirmRoute } from './term-deposit-confirm.route';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule, 
    TermDepositConfirmRoute
  ],
  declarations: [
      ChangeTermDepositSwitchTermConfirmComponent
  ],
  exports: [
      ChangeTermDepositSwitchTermConfirmComponent,
  ]
})
export class TermDepositConfirmModule {
 }