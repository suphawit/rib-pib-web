import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RIBWebTermAndCondition } from './rib-web-term-and-condition.component';

export const ROUTES: Routes = [
  { path: '', component: RIBWebTermAndCondition, data: { menuCode: 'Terms' } },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class TermAndConditionPageRoute {
}