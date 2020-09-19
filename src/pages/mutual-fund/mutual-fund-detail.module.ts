import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MutualFundSummaryPageModule } from './mutual-fund-summary-page.module';

import { MutualFundDetailComponent } from './mutual-fund-detail.component';
import { MutualFundDetailRoute } from './mutual-fund-detail.route';
 
@NgModule({
    imports: [
        CommonModule,
        MutualFundSummaryPageModule,
        MutualFundDetailRoute
    ],
    declarations: [
        MutualFundDetailComponent
    ],
    exports: [
        MutualFundDetailComponent
    ]
})
export class MutualFundDetailModule {
}