import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RIBWebKKProductAndServicePage } from "./kk-product-and-service.component";

export const ROUTES: Routes = [
  { path: '', component: RIBWebKKProductAndServicePage, data: { menuCode: 'KK_PRODUCT_SERVICE' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class KKProductAndServiceRoute {
}