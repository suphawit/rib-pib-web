import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountListPageComponent } from './my-account-list-page.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountListPageComponent, data: { menuCode: 'MY_DEPOSITS' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountListPageRoute {
}