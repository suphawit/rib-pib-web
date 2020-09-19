import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BillerAdd } from "./biller-add";
import { AlertMessageModule } from "../../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../../share/component/step-wizard/step-wizard.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../../../../../share/directives/directives.module";
import { BillerAddRoute } from "./biller-add.route";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
        StepWizardModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        BillerAddRoute
    ],
    declarations: [
        BillerAdd
    ],
    exports: [
        BillerAdd
    ],
    providers: [
    ]
})
export class BillerAddModule {
}