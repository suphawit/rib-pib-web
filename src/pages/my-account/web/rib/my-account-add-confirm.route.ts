import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountAddConfirmComponent } from './add/my-account-add-confirm.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountAddConfirmComponent, data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountAddConfirmRoute {
}