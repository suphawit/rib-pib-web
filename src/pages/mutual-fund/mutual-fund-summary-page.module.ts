import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { FormsModule } from '@angular/forms';

import { PaginationModule } from '../../share/component/pagination/pagination.module';
import { AlertMessageModule } from '../../share/component/alert-message/alert-message.module';

import { MutualFundSummaryPageComponent } from './mutual-fund-summary-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        PaginationModule,
        AlertMessageModule
    ],
    declarations: [
        MutualFundSummaryPageComponent
    ],
    exports: [
        MutualFundSummaryPageComponent
    ]
})
export class MutualFundSummaryPageModule {
}