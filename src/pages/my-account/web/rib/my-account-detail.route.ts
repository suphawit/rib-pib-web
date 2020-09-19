import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../../../share/service/AuthGuard';

import { MyAccountDetailPageComponent } from './my-account-detail-page.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountDetailPageComponent, data: { menuCode: 'MY_DEPOSITS.DETAIL' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountDetailRoute {
}