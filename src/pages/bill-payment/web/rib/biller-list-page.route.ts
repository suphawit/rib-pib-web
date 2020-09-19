import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { BillerListPageComponent } from "./biller-list-page.component";

export const ROUTES: Routes = [
  { path: '', component: BillerListPageComponent, data: { menuCode: 'MANAGE_BILLER.LIST' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class BillerListPageRoute {
}