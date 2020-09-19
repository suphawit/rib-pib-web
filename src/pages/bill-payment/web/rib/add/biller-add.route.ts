import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from '../../../../share/service/AuthGuard';
import { BillerAdd } from "./biller-add";


export const ROUTES: Routes = [
  { path: '', component: BillerAdd, data: { menuCode: 'MANAGE_BILLER.ADD_VERIFY' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerAddRoute {
}