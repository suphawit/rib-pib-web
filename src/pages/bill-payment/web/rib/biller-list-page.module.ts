import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BillerListPageComponent } from "./biller-list-page.component";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { BillerAccordianComponent } from "../../biller-accordian.component";
import { BillerListPageRoute } from "./biller-list-page.route";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
        BillerListPageRoute
    ],
    declarations: [
        BillerAccordianComponent,
        BillerListPageComponent
    ],
    exports: [
        BillerAccordianComponent,
        BillerListPageComponent
    ],
    providers: [
    ]
})
export class BillerListPageModule {
}