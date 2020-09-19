import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { OtherAccountEditConfirm } from './edit/other-account-edit-confirm.component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountEditConfirm, data: { menuCode: 'OTHER_ACCOUNTS.edit2' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountEditConfirmRoute {
}