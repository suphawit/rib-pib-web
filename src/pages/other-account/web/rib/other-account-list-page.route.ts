import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { OtherAccountListPageComponent } from './other-account-list-page.component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountListPageComponent, data: { menuCode: 'OTHER_ACCOUNTS' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountListPageRoute {
}