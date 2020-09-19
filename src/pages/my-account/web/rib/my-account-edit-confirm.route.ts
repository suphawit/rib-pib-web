import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountEditConfirmComponent } from './edit/my-account-edit-confirm.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountEditConfirmComponent, data: { menuCode: 'MY_DEPOSITS.EDIT_CONFIRM' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountEditConfirmRoute {
}