import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { RIBWebFAQ } from "./faq";
import { RIBWebFAQRoute } from "./faq.route";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        RIBWebFAQRoute
    ],
    declarations: [
        RIBWebFAQ
    ],
    exports: [
        RIBWebFAQ
    ],
    providers: [
    ]
})
export class FaqModule {
}