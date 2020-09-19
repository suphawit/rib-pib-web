import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { ModalModule } from 'ng2-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UtilService } from '../../service/util.service';
import { Constants } from '../../service/constants';
import { PermissionAction } from '../../service/permission.service';
import { TermsAndConditionsService } from './terms-and-conditions.service';
import { TermAndConditionModalService } from './terms-and-conditions-modal.service';
import { LanguageSettingService } from '../../../pages/main-layout/web/language-setting.service';

import { VerifyOTPModule } from '../verify-otp/verify-otp.module';
import { AlertMessageModule } from '../alert-message/alert-message.module';

import { AcceptTermsAndConditionComponent } from './accept-terms-and-conditions.component';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { TermsAndConditionsModalComponent } from './terms-and-conditions-modal.component';
import { PipesModule } from "../../pipe/pipe.module";

@NgModule({
  imports: [
      CommonModule, 
      TranslateModule, 
      FormsModule, 
      ReactiveFormsModule, 
      ModalModule, 
      VerifyOTPModule, 
      AlertMessageModule,
      PipesModule,
  ],
  declarations: [
      AcceptTermsAndConditionComponent,
      TermsAndConditionsComponent,
      TermsAndConditionsModalComponent
  ],
  exports: [
      AcceptTermsAndConditionComponent,
      TermsAndConditionsComponent,
      TermsAndConditionsModalComponent
  ],
  providers: [
      LanguageSettingService
  ]
})
export class TermAndConditionsModule {
    static forRoot(): ModuleWithProviders { 
        return {
            ngModule: TermAndConditionsModule, 
            providers: [
                TermsAndConditionsService, 
                TermAndConditionModalService
            ]
        }; 
    }
 }