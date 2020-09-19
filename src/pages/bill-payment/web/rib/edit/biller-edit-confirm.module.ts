import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BillerEditConfirm } from "./biller-edit-confirm";
import { AlertMessageModule } from "../../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../../share/component/step-wizard/step-wizard.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { VerifyOTPModule } from "../../../../../share/component/verify-otp/verify-otp.module";
import { BillerEditConfirmRoute } from "./biller-edit-confirm.route";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
        StepWizardModule,
        FormsModule,
        ReactiveFormsModule,
        VerifyOTPModule,
        BillerEditConfirmRoute
    ],
    declarations: [
        BillerEditConfirm
    ],
    exports: [
        BillerEditConfirm
    ],
    providers: [
    ]
})
export class BillerEditConfirmModule {
}