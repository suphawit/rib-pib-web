import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BillerEdit } from "./biller-edit";
import { AlertMessageModule } from "../../../../../share/component/alert-message/alert-message.module";
import { StepWizardModule } from "../../../../../share/component/step-wizard/step-wizard.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../../../../../share/directives/directives.module";
import { BillerEditRoute } from "./biller-edit.route";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        DirectivesModule,
        AlertMessageModule,
        StepWizardModule,
        FormsModule,
        ReactiveFormsModule,
        BillerEditRoute
    ],
    declarations: [
        BillerEdit
    ],
    exports: [
        BillerEdit
    ],
    providers: [
    ]
})
export class BillerEditModule {
}