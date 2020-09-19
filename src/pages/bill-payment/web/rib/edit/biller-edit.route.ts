import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { BillerEdit } from "./biller-edit";

export const ROUTES: Routes = [
  { path: '', component: BillerEdit, data: { menuCode: 'MANAGE_BILLER.EDIT_VERIFY' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerEditRoute {
}