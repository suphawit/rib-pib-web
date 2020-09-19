import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { PIBMenuRoot } from "./main-menu";
import { TreeView } from "./menu-tree-view.component";
import { UserProfileModule } from "../../../../share/component/user-profile/user-profile.module";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        UserProfileModule
    ],
    declarations: [
        PIBMenuRoot,
        TreeView
    ],
    exports: [
        PIBMenuRoot,
        TreeView
    ],
    providers: [
    ]
})
export class MainMenuModule {
}