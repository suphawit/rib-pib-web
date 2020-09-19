import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountAddComponent } from './add/my-account-add.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountAddComponent, data: { menuCode: 'MY_DEPOSITS.ADD' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountAddRoute {
}