import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PIBWebKKProductAndServicePage } from "./kk-product-and-service.component";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { KKProductAndServiceDetail } from "../../kk-product-and-service-detail";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
    ],
    declarations: [
        PIBWebKKProductAndServicePage,
        KKProductAndServiceDetail
    ],
    exports: [
        PIBWebKKProductAndServicePage
    ],
    providers: [
    ]
})
export class KKProductAndServiceModule {
}