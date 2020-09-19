import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { LoginComponent } from "./login";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
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