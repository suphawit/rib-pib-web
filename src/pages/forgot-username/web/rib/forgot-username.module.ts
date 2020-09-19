import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { ForgotUsernameComponent } from "./forgot-username.component";
import { ForgotUsernameResultComponent } from "./forgot-username-result.component";
import { ForgotUsernameVerifyAccountComponent } from "./forgot-username-verify-account.component";
import { ForgotUsernameVerifyOTPComponent } from "./forgot-username-verify-otp.component";
import { ForgotUsernameVerifyRefcodeComponent } from "./forgot-username-verify-refcode.component";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../share/component/step-wizard/step-wizard.module";
import { RouterModule } from "@angular/router";
import { VerifyAccountFormModule } from "../../../../share/component/verify-account-form/verify-account-form.module";
import { VerifyOTPModule } from "../../../../share/component/verify-otp/verify-otp.module";
import { VerifyRefCodeModule } from "../../../../share/component/verify-ref-code/verify-ref-code.module";
import { ModalModule } from 'ng2-bootstrap/modal';
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        ModalModule,
        AlertMessageModule,
        StepWizardModule,
        RouterModule,
        VerifyAccountFormModule,
        VerifyOTPModule,
        VerifyRefCodeModule,
    ],
    declarations: [
        ForgotUsernameComponent,
        ForgotUsernameResultComponent,
        ForgotUsernameVerifyAccountComponent,
        ForgotUsernameVerifyOTPComponent,
        ForgotUsernameVerifyRefcodeComponent,
    ],
    exports: [
        ForgotUsernameComponent,
        ForgotUsernameResultComponent,
        ForgotUsernameVerifyAccountComponent,
        ForgotUsernameVerifyOTPComponent,
        ForgotUsernameVerifyRefcodeComponent,
    ],
    providers: [
    ]
})
export class ForgotUsernameModule {
}