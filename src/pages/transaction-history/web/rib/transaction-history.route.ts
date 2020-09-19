import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { TransactionHistoryPageComponent } from './transaction-history-page.component';

export const ROUTES: Routes = [
  { path: '', component: TransactionHistoryPageComponent, data: { menuCode: 'TRANSACTION_HISTORY' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class TransactionHistoryRoute {
}