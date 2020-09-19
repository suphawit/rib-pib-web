import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { OtherAccountEdit } from './edit/other-account-edit.component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountEdit, data: { menuCode: 'OTHER_ACCOUNTS.edit1' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountEditRoute {
}