import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { ChangeTermDepositSwitchTermComponent } from './change-term-deposit-switch-term.component';

export const ROUTES: Routes = [
  { path: '', component: ChangeTermDepositSwitchTermComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class TermDepositRoute {
}