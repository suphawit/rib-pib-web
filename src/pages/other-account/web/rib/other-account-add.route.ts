import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { OtherAccountAdd } from './add/other-account-add.component';

export const ROUTES: Routes = [
  { path: '', component: OtherAccountAdd, data: { menuCode: 'OTHER_ACCOUNTS.add1' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class OtherAccountAddRoute {
}