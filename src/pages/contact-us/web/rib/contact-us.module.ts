import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { RIBWebContactUs } from "./contact-us";
import { ContactUsRoute } from './contact-us.route';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        ContactUsRoute
    ],
    declarations: [
        RIBWebContactUs
    ],
    exports: [
        RIBWebContactUs
    ],
    providers: [
    ]
})
export class ContactUsModule {
}