import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { SchedulePageComponent } from './schedule-page.component';

export const ROUTES: Routes = [
  { path: '', component: SchedulePageComponent, data: { menuCode: 'MANAGE_SCHEDULE' } }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ScheduleRoute {
}