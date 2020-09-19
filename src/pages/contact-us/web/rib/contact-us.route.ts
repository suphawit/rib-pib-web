import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { RIBWebContactUs } from './contact-us';

export const ROUTES: Routes = [
  { path: '', component: RIBWebContactUs, data: { menuCode: 'CONTRACTUS' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ContactUsRoute {
}