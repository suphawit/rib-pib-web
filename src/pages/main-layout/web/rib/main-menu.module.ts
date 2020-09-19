import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { RIBMenuRoot } from "./main-menu";
import { TreeView } from "./menu-tree-view.component";
import { FormsModule } from "@angular/forms";
import { TermAndConditionsModule } from "../../../../share/component/terms-and-conditions/term-and-conditions.module";
import { DirectivesModule } from "../../../../share/directives/directives.module";
import { PipesModule } from "../../../../share/pipe/pipe.module";
import { ResponsiveModule } from "ng2-responsive";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        PipesModule,
        DirectivesModule,
        FormsModule,
        TermAndConditionsModule,
        ResponsiveModule
    ],
    declarations: [
        RIBMenuRoot,
        TreeView
    ],
    exports: [
        RIBMenuRoot,
        TreeView
    ],
    providers: [
    ]
})
export class MainMenuModule {
}