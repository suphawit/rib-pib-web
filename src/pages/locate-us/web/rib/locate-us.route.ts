import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RIBWebLocateUs } from "./locate-us";

export const ROUTES: Routes = [
  { path: '', component: RIBWebLocateUs, data: { menuCode: 'LOCATEUS' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class LocateUsRoute {
}