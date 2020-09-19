import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { RIBWebKKProductAndServicePage } from "./kk-product-and-service.component";
import { KKProductAndServiceDetail } from "../../kk-product-and-service-detail";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";
import { KKProductAndServiceRoute } from './kk-product-and-service.route';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
        KKProductAndServiceRoute
    ],
    declarations: [
        RIBWebKKProductAndServicePage,
        KKProductAndServiceDetail
    ],
    exports: [
        RIBWebKKProductAndServicePage
    ],
    providers: [
        
    ]
})
export class KKProductAndServiceModule {
}