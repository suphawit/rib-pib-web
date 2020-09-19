import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { AccountActivateService } from "./account-activate.service";
import { AccountActivateComponent } from "./account-activate.component";
import { RouterModule } from "@angular/router";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { AccountActivateVerifyRefCodeComponent } from "./account-activate-verify-ref-code.component";
import { VerifyRefCodeModule } from "../../../../share/component/verify-ref-code/verify-ref-code.module";
import { VerifyOTPModule } from "../../../../share/component/verify-otp/verify-otp.module";
import { AccountActivateVerifyOtpComponent } from "./account-activate-verify-otp.component";
import { AccountActivateCreateUserAccountComponent } from "./account-activate-create-user-account.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { ModalMessagesModule } from "../../../../share/component/modal-messages.module";
import { StepWizardModule } from "../../../../share/component/step-wizard/step-wizard.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        VerifyOTPModule,
        AlertMessageModule,
        VerifyRefCodeModule,
        RouterModule,
        ModalMessagesModule,
        FormsModule,
        ReactiveFormsModule,
        StepWizardModule
    ],
    declarations: [
        AccountActivateComponent,
        AccountActivateVerifyRefCodeComponent,
        AccountActivateVerifyOtpComponent,
        AccountActivateCreateUserAccountComponent
    ],
    exports: [
        AccountActivateComponent,
        AccountActivateVerifyRefCodeComponent,
        AccountActivateVerifyOtpComponent,
        AccountActivateCreateUserAccountComponent
    ],
    providers: [
        AccountActivateService
    ]
})
export class AccountActivateModule { }