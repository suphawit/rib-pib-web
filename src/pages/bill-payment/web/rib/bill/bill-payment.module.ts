import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../../share/directives/directives.module";
import { VerifyOTPModule } from "../../../../../share/component/verify-otp/verify-otp.module";
import { AlertMessageModule } from "../../../../../share/component/alert-message/alert-message.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StepWizardModule } from "../../../../../share/component/step-wizard/step-wizard.module";
import { FromAccountListModule } from "../../../../../share/component/from-account-list/web/from-account-list.module";
import { AccordionModule } from "ng2-bootstrap";
import { DatepickerModule as MaterialDatepicker } from 'ng2-datepicker'
import { RIBBillPayment } from "./rib-bill-payment";
import { RIBBillPaymentStep1 } from "./rib-bill-payment-step1";
import { RIBBillPaymentStep2 } from "./rib-bill-payment-step2";
import { RIBBillPaymentStep3 } from "./rib-bill-payment-step3";
import { BillPaymentInputDetails } from "./component/bill-payment-input-details.component";
import { ToBillerList } from "./component/to-biller-list.component";
import { BillPaymentConfirm } from "./component/bill-payment-confirm.component";
import { BillPaymentComplete } from "./component/bill-payment-complete.component";
import { BillPaymentService } from "../../../bill-payment.service";
import {EDonationModalComponent} from "./component/e-donation-modal.component";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        VerifyOTPModule,
        AlertMessageModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        StepWizardModule,
        FromAccountListModule,
        MaterialDatepicker,
        AccordionModule
    ],
    declarations: [
        RIBBillPayment,
        RIBBillPaymentStep1,
        RIBBillPaymentStep2,
        RIBBillPaymentStep3,
        BillPaymentInputDetails,
        ToBillerList,
        BillPaymentConfirm,
        BillPaymentComplete,
        EDonationModalComponent
    ],
    exports: [
        RIBBillPayment,
        RIBBillPaymentStep1,
        RIBBillPaymentStep2,
        RIBBillPaymentStep3,
        BillPaymentInputDetails,
        ToBillerList,
        BillPaymentConfirm,
        BillPaymentComplete
    ],
    providers: [
    ]
})
export class BillPaymentModule {
    static forRoot(): ModuleWithProviders {
		return {
			ngModule: BillPaymentModule,
			providers: [
                BillPaymentService
			],
		}
	}
}