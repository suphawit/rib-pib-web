import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RIBWebPrivacyPolicy } from './privacy-policy';

export const ROUTES: Routes = [
  { path: '', component: RIBWebPrivacyPolicy, data: { menuCode: 'activate' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class PrivacyPolicyRoute {
}