import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MutualFundDetailComponent } from './mutual-fund-detail.component';

export const ROUTES: Routes = [
  { path: '', component: MutualFundDetailComponent, data: { menuCode: 'MY_MUTUAL_FUND.DETAIL' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MutualFundDetailRoute {
}