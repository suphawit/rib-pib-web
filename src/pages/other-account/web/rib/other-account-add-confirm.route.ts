import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { OtherAccountAddConfirm } from './add/other-account-add-confirm.component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountAddConfirm, data: { menuCode: 'OTHER_ACCOUNTS.add2' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountAddConfirmRoute {
}