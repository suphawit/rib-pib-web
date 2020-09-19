import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { DisclaimerWeb } from "./disclaimer-web";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
    ],
    declarations: [
        DisclaimerWeb
    ],
    exports: [
        DisclaimerWeb
    ],
    providers: [
    ]
})
export class DisclaimerModule {
}