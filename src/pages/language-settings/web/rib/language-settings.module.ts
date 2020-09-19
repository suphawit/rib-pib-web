import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { RIBWebLanguageSettings } from "./language-settings";
import { LanguageSettingsRoute } from './language-settings.route';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LanguageSettingsRoute
    ],
    declarations: [
        RIBWebLanguageSettings
    ],
    exports: [
        RIBWebLanguageSettings
    ],
    providers: [
    ]
})
export class LanguageSettingsModule {
}