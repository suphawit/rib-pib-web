import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { LoginComponent } from "./login";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ],
    providers: [
    ]
})
export class LoginModule {
}