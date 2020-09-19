import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MutualFundSummaryPageModule } from './mutual-fund-summary-page.module';

import { MutualFundSummaryComponent } from './mutual-fund-summary.component';
import { MutualFundSummaryRoute } from './mutual-fund-summary.route';

@NgModule({
    imports: [
        CommonModule,
        MutualFundSummaryRoute,
        MutualFundSummaryPageModule
    ],
    declarations: [
        MutualFundSummaryComponent
    ],
    exports: [
        MutualFundSummaryComponent
    ]
})
export class MutualFundSummaryModule {
}