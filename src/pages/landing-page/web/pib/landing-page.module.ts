import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { LandingPagePIB } from "./landing-page";
import { AlertMessageModule } from "../../../../share/component/alert-message/alert-message.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        AlertMessageModule
    ],
    declarations: [
        LandingPagePIB
    ],
    exports: [
        LandingPagePIB
    ],
    providers: [
    ]
})
export class LandingPageModule {
}