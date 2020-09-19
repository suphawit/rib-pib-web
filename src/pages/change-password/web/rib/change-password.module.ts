import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { RIBWebChangePassword } from "./change-password";
import { RouterModule } from "@angular/router";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../share/component/step-wizard/step-wizard.module";
import { ModalMessagesModule } from "../../../../share/component/modal-messages.module";
import { RIBWebChangePasswordVerifyOTP } from "./change-password-verify-otp";
import { RIBWebChangePasswordNew } from "./change-password-new";
import { VerifyOTPModule } from "../../../../share/component/verify-otp/verify-otp.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChangePasswordService } from "../../changePassword.service";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        RouterModule,
        AlertMessageModule,
        StepWizardModule,
        ModalMessagesModule,
        VerifyOTPModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        RIBWebChangePassword,
        RIBWebChangePasswordVerifyOTP,
        RIBWebChangePasswordNew
    ],
    exports: [
        RIBWebChangePassword,
        RIBWebChangePasswordVerifyOTP,
        RIBWebChangePasswordNew
    ],
    providers: [
    ]
})
export class ChangePasswordModule {
}