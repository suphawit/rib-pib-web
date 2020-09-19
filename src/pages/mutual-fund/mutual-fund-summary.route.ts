import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MutualFundSummaryComponent } from './mutual-fund-summary.component';

export const ROUTES: Routes = [
  { path: '', component: MutualFundSummaryComponent, data: { menuCode: 'MY_MUTUAL_FUND.SUMMARY' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MutualFundSummaryRoute {
}