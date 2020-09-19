import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { MyAccountStatementPageComponent } from './my-account-statement-page.component';

export const ROUTES: Routes = [
  { path: '', component: MyAccountStatementPageComponent, data: { menuCode: 'MY_DEPOSITS.STATEMENT' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class MyAccountStatementPageRoute {
}