import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountEditComponent } from './edit/my-account-edit.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountEditComponent, data: { menuCode: 'MY_DEPOSITS.EDIT' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountEditRoute {
}