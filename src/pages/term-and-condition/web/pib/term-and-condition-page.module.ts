import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { TermAndConditionsModule } from '../../../../share/component/terms-and-conditions/term-and-conditions.module';

import { PIBWebTermAndCondition } from './pib-web-term-and-condition.component';
import { TermAndConAfterLogin } from './tc-after-login.component';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule, 
    TermAndConditionsModule
  ],
  declarations: [
      PIBWebTermAndCondition,
      TermAndConAfterLogin
  ],
  exports: [
      PIBWebTermAndCondition,
      TermAndConAfterLogin
  ]
})
export class TermAndConditionPageModule {}