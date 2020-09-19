import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { BillerEditConfirm } from "./biller-edit-confirm";

export const ROUTES: Routes = [
  { path: '', component: BillerEditConfirm, data: { menuCode: 'MANAGE_BILLER.EDIT_CONFIRM' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerEditConfirmRoute {
}