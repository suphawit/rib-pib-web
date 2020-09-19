import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { RIBWebServices } from './services';

export const ROUTES: Routes = [
  { path: '', component: RIBWebServices, data: { menuCode: 'SERVICES' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ServiceRoute {
}