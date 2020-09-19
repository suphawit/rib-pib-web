import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { ChangeTermDepositSwitchTermConfirmComponent } from './change-term-deposit-switch-term-confirm.component';

export const ROUTES: Routes = [
  { path: '', component: ChangeTermDepositSwitchTermConfirmComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD_CONFIRM' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class TermDepositConfirmRoute {
}