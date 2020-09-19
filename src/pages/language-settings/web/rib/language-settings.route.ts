import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { RIBWebLanguageSettings } from "./language-settings";

export const ROUTES: Routes = [
  { path: '', component: RIBWebLanguageSettings, data: { menuCode: 'CHANGE_LANGUAGE' } },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class LanguageSettingsRoute {
}