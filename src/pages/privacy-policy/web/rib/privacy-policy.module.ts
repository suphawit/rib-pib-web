import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { RIBWebPrivacyPolicy } from './privacy-policy';
import { PrivacyPolicyRoute } from './privacy-policy.route';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    PrivacyPolicyRoute
  ],
  declarations: [
      RIBWebPrivacyPolicy
  ],
  exports: [
      RIBWebPrivacyPolicy
  ]
})
export class PrivacyPolicyModule {}