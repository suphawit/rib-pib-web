import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { OtherAccountDetailPageComponent } from '../../other-account-detail-page-component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountDetailPageComponent, data: { menuCode: 'OTHER_ACCOUNTS.DETAIL' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountDetailRoute {
}