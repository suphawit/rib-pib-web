import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ForgotResetPasswordComponent } from "./forgot-reset-password.component";
import { ForgotResetPasswordRequestRefCodeComponent } from "./forgot-reset-password-request-ref-code.component";
import { ForgotResetPasswordVerifyRefCodeComponent } from "./forgot-reset-password-verify-refcode.component";
import { ForgotResetPasswordVerifyOTPComponent } from "./forgot-reset-password-verify-otp.component";
import { ForgotResetPasswordResetPasswordComponent } from "./forgot-reset-password-reset-password.component";

export const ROUTES: Routes = [
    {
        path: '', component: ForgotResetPasswordComponent,
        data: { menuCode: 'forgotResetPassword' },
        children: [
            {
                path: '',
                redirectTo: 'request-refcode', pathMatch: 'full'
            },
            { path: 'request-refcode', component: ForgotResetPasswordRequestRefCodeComponent },
            { path: 'verify-refcode', component: ForgotResetPasswordVerifyRefCodeComponent },
            { path: 'verify-otp', component: ForgotResetPasswordVerifyOTPComponent },
            { path: 'reset-password', component: ForgotResetPasswordResetPasswordComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class ForgotResetPasswordRoute {
}