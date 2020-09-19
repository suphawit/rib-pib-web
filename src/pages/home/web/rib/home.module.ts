import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { HomeComponent } from "./home.component";
import { ResponsiveModule } from "ng2-responsive";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ResponsiveModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule {
}