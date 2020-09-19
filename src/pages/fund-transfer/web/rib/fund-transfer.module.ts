import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { RIBFundTransfer } from "./rib-fund-transfer";
import { RIBFundTransferStep1 } from "./rib-fund-transfer-step1";
import { RIBFundTransferStep2 } from "./rib-fund-transfer-step2";
import { RIBFundTransferStep3 } from "./rib-fund-transfer-step3";
import { RouterModule } from "@angular/router";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { StepWizardModule } from "../../../../share/component/step-wizard/step-wizard.module";
import { FromAccountListModule } from "../../../../share/component/from-account-list/web/from-account-list.module";
import { StepProcessModule } from "../../../../share/component/step-process/web/step-process.module";
import { ToAccountListModule } from "../../../../share/component/to-account-list/web/to-account-list.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        RouterModule,
        DirectivesModule,
        AlertMessageModule,
        StepWizardModule,
        FromAccountListModule,
        ToAccountListModule,
        StepProcessModule,
    ],
    declarations: [
        RIBFundTransfer,
        RIBFundTransferStep1,
        RIBFundTransferStep2,
        RIBFundTransferStep3
    ],
    exports: [
        RIBFundTransfer,
        RIBFundTransferStep1,
        RIBFundTransferStep2,
        RIBFundTransferStep3
    ],
    providers: [
    ]
})
export class FundTransferModule {
    static forRoot(): ModuleWithProviders {
		return {
			ngModule: FundTransferModule,
			providers: [
			],
		}
	}
}