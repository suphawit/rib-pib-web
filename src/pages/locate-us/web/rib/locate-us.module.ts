import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { RIBWebLocateUs } from "./locate-us";
import { FormsModule } from "@angular/forms";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { LocateUsRoute } from './locate-us.route';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        FormsModule,
        AgmCoreModule,
        FilterPipeModule,
        LocateUsRoute
    ],
    declarations: [
        RIBWebLocateUs
    ],
    exports: [
        RIBWebLocateUs
    ],
    providers: [
    ]
})
export class LocateUsModule {
}