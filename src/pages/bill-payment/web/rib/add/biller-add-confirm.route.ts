import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../../../share/service/AuthGuard';
import { BillerAddConfirm } from "./biller-add-confirm";


export const ROUTES: Routes = [
  { path: '', component: BillerAddConfirm, data: { menuCode: 'MANAGE_BILLER.ADD_CONFIRM' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerAddConfirmRoute {
}