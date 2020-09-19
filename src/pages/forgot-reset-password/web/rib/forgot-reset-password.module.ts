import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { ForgotResetPasswordComponent } from "./forgot-reset-password.component";
import { ForgotResetPasswordRequestRefCodeComponent } from "./forgot-reset-password-request-ref-code.component";
import { ForgotResetPasswordVerifyRefCodeComponent } from "./forgot-reset-password-verify-refcode.component";
import { ForgotResetPasswordVerifyOTPComponent } from "./forgot-reset-password-verify-otp.component";
import { ForgotResetPasswordResetPasswordComponent } from "./forgot-reset-password-reset-password.component";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../share/component/step-wizard/step-wizard.module";
import { RouterModule } from "@angular/router";
import { ResetPasswordFormModule } from "../../../../share/component/reset-password-form/reset-password-form.module";
import { VerifyOTPModule } from "../../../../share/component/verify-otp/verify-otp.module";
import { VerifyRefCodeModule } from "../../../../share/component/verify-ref-code/verify-ref-code.module";
import { RequestReferenceFormModule } from "../../../../share/component/request-reference-form/request-reference-form.module";
import { ModalMessagesModule } from "../../../../share/component/modal-messages.module";
import { FormsModule } from "@angular/forms";
import { ForgotResetPasswordRoute } from "./forgot-reset-password.route";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        AlertMessageModule,
        StepWizardModule,
        RouterModule,
        ResetPasswordFormModule,
        VerifyOTPModule,
        VerifyRefCodeModule,
        RequestReferenceFormModule,
        ModalMessagesModule,
        // ForgotResetPasswordRoute
    ],
    declarations: [
        ForgotResetPasswordComponent,
        ForgotResetPasswordRequestRefCodeComponent,
        ForgotResetPasswordVerifyRefCodeComponent,
        ForgotResetPasswordVerifyOTPComponent,
        ForgotResetPasswordResetPasswordComponent,
    ],
    exports: [
        ForgotResetPasswordComponent,
        ForgotResetPasswordRequestRefCodeComponent,
        ForgotResetPasswordVerifyRefCodeComponent,
        ForgotResetPasswordVerifyOTPComponent,
        ForgotResetPasswordResetPasswordComponent,
    ],
    providers: [
    ]
})
export class ForgotResetPasswordModule {
}