import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { BillerDetailPageComponent } from "./biller-detail-page-component";

export const ROUTES: Routes = [
  { path: '', component: BillerDetailPageComponent, data: { menuCode: 'MANAGE_BILLER.DETAIL' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerDetailPageRoute {
}