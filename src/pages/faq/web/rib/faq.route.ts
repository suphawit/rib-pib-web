import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { RIBWebFAQ } from "./faq";

export const ROUTES: Routes = [
  { path: '', component: RIBWebFAQ, data: { menuCode: 'FAQ' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class RIBWebFAQRoute {
}