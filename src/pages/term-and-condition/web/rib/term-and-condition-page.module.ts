import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { TermAndConditionsModule } from '../../../../share/component/terms-and-conditions/term-and-conditions.module';

import { RIBWebTermAndCondition } from './rib-web-term-and-condition.component';
import { TermAndConditionPageRoute } from './term-and-condition-page.route';

@NgModule({
  imports: [
    CommonModule, 
    TranslateModule, 
    TermAndConditionsModule,
    TermAndConditionPageRoute
  ],
  declarations: [
      RIBWebTermAndCondition
  ],
  exports: [
      RIBWebTermAndCondition
  ]
})
export class TermAndConditionPageModule {}