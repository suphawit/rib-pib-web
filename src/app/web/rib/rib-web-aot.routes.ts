import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AccountActivateComponent } from '../../../pages/activate-customer/web/rib/account-activate.component';
import { AccountActivateVerifyRefCodeComponent } from '../../../pages/activate-customer/web/rib/account-activate-verify-ref-code.component';
import { AccountActivateVerifyOtpComponent } from '../../../pages/activate-customer/web/rib/account-activate-verify-otp.component';
import { AccountActivateCreateUserAccountComponent } from '../../../pages/activate-customer/web/rib/account-activate-create-user-account.component';
import { AccountActivateAcceptTermsAndConditionsComponent } from '../../../pages/activate-customer/web/rib/account-activate-accept-terms-and-conditions.component';
import { AuthGuard } from '../../../share/service/AuthGuard';
import { HomeComponent } from '../../../pages/home/web/rib/home.component';
import { ForgotResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password.component';
import { ForgotResetPasswordRequestRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-request-ref-code.component';
import { ForgotResetPasswordVerifyRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-refcode.component';
import { ForgotResetPasswordVerifyOTPComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-otp.component';
import { ForgotResetPasswordResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-reset-password.component';
import { ForgotUsernameComponent } from '../../../pages/forgot-username/web/rib/forgot-username.component';
import { ForgotUsernameResultComponent } from '../../../pages/forgot-username/web/rib/forgot-username-result.component';
import { ForgotUsernameVerifyAccountComponent } from '../../../pages/forgot-username/web/rib/forgot-username-verify-account.component';
import { ForgotUsernameVerifyOTPComponent } from '../../../pages/forgot-username/web/rib/forgot-username-verify-otp.component';
import { ForgotUsernameVerifyRefcodeComponent } from '../../../pages/forgot-username/web/rib/forgot-username-verify-refcode.component';
import { ChangeTermDepositBaseComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-base.component';
import { RIBWebChangePassword } from '../../../pages/change-password/web/rib/change-password';
import { RIBWebChangePasswordVerifyOTP } from '../../../pages/change-password/web/rib/change-password-verify-otp';
import { RIBWebChangePasswordNew } from '../../../pages/change-password/web/rib/change-password-new';
import { RIBFundTransfer } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer';
import { RIBFundTransferStep1 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step1';
import { RIBFundTransferStep2 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step2';
import { RIBFundTransferStep3 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step3';
import { BillerDetailPageComponent } from '../../../pages/bill-payment/biller-detail-page-component';
import { RIBBillPayment } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment';
import { RIBBillPaymentStep1 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step1';
import { RIBBillPaymentStep2 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step2';
import { RIBBillPaymentStep3 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step3';
import { RIBMenuRoot } from '../../../pages/main-layout/web/rib/main-menu';
// Route Configuration
export const routes: Routes = [
  // { path: 'login', component: RIBMenuRoot, data: { menuCode: 'login' } },
  { path: '', component: HomeComponent, data: { menuCode: "HOME" } },
  {
    path: 'account-activate', component: AccountActivateComponent, data: { menuCode: 'account-activate' },
    children: [
      {
        path: '',
        redirectTo: 'verify-refcode', pathMatch: 'full'
      },
      { path: 'verify-refcode', component: AccountActivateVerifyRefCodeComponent, data: { menuCode: 'account-activate.verify-ref-code' } },
      { path: 'verify-otp', component: AccountActivateVerifyOtpComponent, data: { menuCode: 'account-activate.verify-otp' } },
      { path: 'accept-terms-and-conditions', component: AccountActivateAcceptTermsAndConditionsComponent, data: { menuCode: 'account-activate.accept-terms-and-conditions' } },
      { path: 'create-user-account', component: AccountActivateCreateUserAccountComponent, data: { menuCode: 'account-activate.create-user-account' } }
    ]
  },
  { path: 'contact-us', loadChildren: '../../../pages/contact-us/web/rib/contact-us.module#ContactUsModule', data: { menuCode: 'CONTRACTUS' } },
  {
    path: 'forgot-reset-password',
    component: ForgotResetPasswordComponent,
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
  },
  {
    path: 'forgot-username', component: ForgotUsernameComponent, data: { menuCode: 'forgotUserName' },
    children: [
      {
        path: '',
        redirectTo: 'verify-refcode', pathMatch: 'full'
      },
      { path: 'verify-refcode', component: ForgotUsernameVerifyRefcodeComponent, data: { menuCode: 'forgotUserName.verify-refcode' } },
      { path: 'verify-otp', component: ForgotUsernameVerifyOTPComponent, data: { menuCode: 'forgotUserName.verify-otp' } },
      { path: 'verify-account', component: ForgotUsernameVerifyAccountComponent, data: { menuCode: 'forgotUserName.verify-account' } },
      { path: 'result', component: ForgotUsernameResultComponent, data: { menuCode: 'forgotUserName.result' } }
    ]
  },
  { path: 'faq', loadChildren:'../../../pages/faq/web/rib/faq.module#FaqModule', data: { menuCode: 'FAQ' } },
  { path: 'services', loadChildren: '../../../pages/services/web/rib/service.module#ServiceModule', data: { menuCode: 'SERVICES' } },
  { path: 'locate-us', loadChildren: '../../../pages/locate-us/web/rib/locate-us.module#LocateUsModule', data: { menuCode: 'LOCATEUS' } },
  {
    path: 'ribpromptpay',
    children: [
      {
        path: '',
        redirectTo: 'rib-web-prompt-pay-register', pathMatch: 'full'
      },
      { 
        path: 'rib-web-prompt-pay-register', 
        loadChildren:'../../../pages/prompt-pay/web/rib/prompt-pay.module#PromptPayModule', 
        data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY' }, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'rib-web-prompt-pay-register-confirm', 
        loadChildren:'../../../pages/prompt-pay/web/rib/prompt-pay-confirm.module#PromptPayConfirmModule', 
        data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP2' }, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'rib-web-prompt-pay-register-success', 
        loadChildren:'../../../pages/prompt-pay/web/rib/prompt-pay-success.module#PromptPaySuccessModule',
        data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP3' }, 
        canActivate: [AuthGuard] 
      }
    ]
  },
  {
    path: 'change-term', component: ChangeTermDepositBaseComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'TD-switch-term', pathMatch: 'full'
      },
      { 
        path: 'TD-switch-term',
        loadChildren: '../../../pages/term-deposit/web/rib/term-deposit.module#TermDepositModule',
        data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD' },
        canActivate: [AuthGuard] 
      },
      { 
        path: 'TD-switch-term-confirm',
        loadChildren: '../../../pages/term-deposit/web/rib/term-deposit-confirm.module#TermDepositConfirmModule',
        data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD_CONFIRM' },
        canActivate: [AuthGuard] 
      }
    ]
  },
  { path: 'language-settings', loadChildren: '../../../pages/language-settings/web/rib/language-settings.module#LanguageSettingsModule' },
  { path: 'term-and-condition', loadChildren: '../../../pages/term-and-condition/web/rib/term-and-condition-page.module#TermAndConditionPageModule' },
  {
    path: 'forgot-reset-password',
    component: ForgotResetPasswordComponent,
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
  },
  {
    path: 'change-password',
    component: RIBWebChangePassword,
    data: { menuCode: 'CHANGE_PASSWORD' },
    children: [
      {
        path: '',
        redirectTo: 'verify-otp', pathMatch: 'full'
      },
      { path: 'verify-otp', component: RIBWebChangePasswordVerifyOTP },
      { path: 'change-password-new-password', component: RIBWebChangePasswordNew },

    ]
  },
  { path: 'privacy-policy', loadChildren: '../../../pages/privacy-policy/web/rib/privacy-policy.module#PrivacyPolicyModule', data: { menuCode: 'activate' } },
  { path: 'list-other-account', loadChildren: '../../../pages/other-account/web/rib/other-account-list-page.module#OtherAccountListPageModule', data: { menuCode: 'OTHER_ACCOUNTS' }, canActivate: [AuthGuard] },
  {
    path: 'add-other-account',
    children: [
      { 
        path: 'step1', 
        loadChildren: '../../../pages/other-account/web/rib/other-account-add.module#OtherAccountAddModule', 
        data: { menuCode: 'OTHER_ACCOUNTS.add1' }, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'step2', 
        loadChildren: '../../../pages/other-account/web/rib/other-account-add-confirm.module#OtherAccountAddConfirmModule',
        data: { menuCode: 'OTHER_ACCOUNTS.add2' }, 
        canActivate: [AuthGuard] }
    ]
  },
   {
    path: 'edit-other-account',
    children: [
      { 
        path: 'step1', 
        loadChildren: '../../../pages/other-account/web/rib/other-account-edit.module#OtherAccountEditModule', 
        data: { menuCode: 'OTHER_ACCOUNTS.edit1' },
        canActivate: [AuthGuard] },
      { 
        path: 'step2', 
        loadChildren: '../../../pages/other-account/web/rib/other-account-edit-confirm.module#OtherAccountEditConfirmModule',
        data: { menuCode: 'OTHER_ACCOUNTS.edit2' }, 
        canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'dashboard', data: { menuCode: 'DASHBOARD' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-deposit', pathMatch: 'full'
      },
      { path: 'my-deposit', loadChildren:'../../../pages/my-account/web/rib/my-account-list-page.module#MyAccountListPageModule', data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard] },
      { path: 'detail', loadChildren:'../../../pages/my-account/web/rib/my-account-detail-page.module#MyAccountDetailPageModule', data: { menuCode: 'MY_DEPOSITS.DETAIL', canActivate: [AuthGuard] } },
      { path: 'statement', loadChildren:'../../../pages/my-account/web/rib/my-account-statement-page.module#MyAccountStatementPageModule', data: { menuCode: 'MY_DEPOSITS.STATEMENT' }, canActivate: [AuthGuard] },
      {
        path: 'add-my-account',
        loadChildren:'../../../pages/my-account/web/rib/my-account-add.module#MyAccountAddModule',
        data: { menuCode: 'MY_DEPOSITS.ADD' }, canActivate: [AuthGuard]
      },
      {
        path: 'add-my-account-confirm',
        loadChildren:'../../../pages/my-account/web/rib/my-account-add-confirm.module#MyAccountAddConfirmModule',
        data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account',
        loadChildren:'../../../pages/my-account/web/rib/my-account-edit.module#MyAccountEditModule',
        data: { menuCode: 'MY_DEPOSITS.EDIT' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account-confirm',
        loadChildren:'../../../pages/my-account/web/rib/my-account-edit-confirm.module#MyAccountEditConfirmModule',
        data: { menuCode: 'MY_DEPOSITS.EDIT_CONFIRM' }, canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'my-account', data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-deposit', pathMatch: 'full'
      },
      { path: 'my-deposit', loadChildren:'../../../pages/my-account/web/rib/my-account-list-page.module#MyAccountListPageModule', data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard] },
      { path: 'detail', loadChildren:'../../../pages/my-account/web/rib/my-account-detail-page.module#MyAccountDetailPageModule', data: { menuCode: 'MY_DEPOSITS.DETAIL', canActivate: [AuthGuard] } },
      { path: 'statement', loadChildren:'../../../pages/my-account/web/rib/my-account-statement-page.module#MyAccountStatementPageModule', data: { menuCode: 'MY_DEPOSITS.STATEMENT' }, canActivate: [AuthGuard] },
      {
        path: 'add-my-account',
        loadChildren:'../../../pages/my-account/web/rib/my-account-add.module#MyAccountAddModule',
        data: { menuCode: 'MY_DEPOSITS.ADD' }, canActivate: [AuthGuard]
      },
      {
        path: 'add-my-account-confirm',
        loadChildren:'../../../pages/my-account/web/rib/my-account-add-confirm.module#MyAccountAddConfirmModule',
        data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account',
        loadChildren:'../../../pages/my-account/web/rib/my-account-edit.module#MyAccountEditModule',
        data: { menuCode: 'MY_DEPOSITS.EDIT' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account-confirm',
        loadChildren:'../../../pages/my-account/web/rib/my-account-edit-confirm.module#MyAccountEditConfirmModule',
        data: { menuCode: 'MY_DEPOSITS.EDIT_CONFIRM' }, canActivate: [AuthGuard]
      }
    ]
  },

 
  {
    path: 'transfer', component: RIBFundTransfer,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: RIBFundTransferStep1, data: { menuCode: 'FUND_TRANSFER' }, canActivate: [AuthGuard] },
      { path: 'step2', component: RIBFundTransferStep2, data: { menuCode: 'FUND_TRANSFER.CONFIRM' }, canActivate: [AuthGuard] },
      { path: 'step3', component: RIBFundTransferStep3, data: { menuCode: 'FUND_TRANSFER.COMPLETE' }, canActivate: [AuthGuard] }
    ]
  },
  { 
    path: 'other-account-detail', 
    loadChildren: '../../../pages/other-account/web/rib/other-account-detail.module#OtherAccountDetailModule',
    data: { menuCode: 'OTHER_ACCOUNTS.DETAIL' },
    canActivate: [AuthGuard]
  },
  {
    path: 'bill-payment', component: RIBBillPayment, //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: RIBBillPaymentStep1, data: { menuCode: 'PAY_BILL' }, canActivate: [AuthGuard] },
      { path: 'step2', component: RIBBillPaymentStep2, data: { menuCode: 'PAY_BILL.STEP2' }, canActivate: [AuthGuard] },
      { path: 'step3', component: RIBBillPaymentStep3, data: { menuCode: 'PAY_BILL.STEP3' }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'manage-bill', data: { menuCode: 'MANAGE_BILLER' }, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'biller-list', pathMatch: 'full' },
      { 
        path: 'biller-list', 
        loadChildren: '../../../pages/bill-payment/web/rib/biller-list-page.module#BillerListPageModule', 
        data: { menuCode: 'MANAGE_BILLER.LIST' }, 
        canActivate: [AuthGuard] 
      },
      { path: 'biller-detail', component: BillerDetailPageComponent, data: { menuCode: 'MANAGE_BILLER.DETAIL' }, canActivate: [AuthGuard] }
      // { 
      //   path: 'biller-detail', 
      //   loadChildren: "../../../pages/bill-payment/biller-detail-page-component.module#BillerDetailPageModule", 
      //   data: { menuCode: 'MANAGE_BILLER.DETAIL' }, 
      //   canActivate: [AuthGuard] 
      // }
    ]
  },
  {
    path: 'manage-bill-add', data: { menuCode: 'MANAGE_BILLER.ADD' }, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'verify-add', pathMatch: 'full' },
      { path: 'verify-add', 
        loadChildren:'../../../pages/bill-payment/web/rib/add/biller-add.module#BillerAddModule', 
        data: { menuCode: 'MANAGE_BILLER.ADD_VERIFY' }, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'confirm-add', 
        loadChildren:'../../../pages/bill-payment/web/rib/add/biller-add-confirm.module#BillerAddConfirmModule', 
        data: { menuCode: 'MANAGE_BILLER.ADD_CONFIRM' }, 
        canActivate: [AuthGuard] 
      },
    ]
  },
  {
    path: 'manage-bill-edit', data: { menuCode: 'MANAGE_BILLER.EDIT' }, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'verify-add', pathMatch: 'full' },
      { 
        path: 'verify-edit', 
        loadChildren:'../../../pages/bill-payment/web/rib/edit/biller-edit.module#BillerEditModule', 
        data: { menuCode: 'MANAGE_BILLER.EDIT_VERIFY' }, 
        canActivate: [AuthGuard] 
      },
      {
        path: 'confirm-add', 
        loadChildren:'../../../pages/bill-payment/web/rib/edit/biller-edit-confirm.module#BillerEditConfirmModule', 
        data: { menuCode: 'MANAGE_BILLER.EDIT_CONFIRM' }, 
        canActivate: [AuthGuard] 
      },
    ]
  },
  { 
    path: 'manage-schedule', 
    loadChildren: '../../../pages/schedule/web/rib/schedule.module#ScheduleModule',
    data: { menuCode: 'MANAGE_SCHEDULE' },
    canActivate: [AuthGuard]
  },
  { 
    path: 'transaction-history', 
    loadChildren: '../../../pages/transaction-history/web/rib/transaction-history.module#TransactionHistoryModule',
    data: { menuCode: 'TRANSACTION_HISTORY' },
    canActivate: [AuthGuard]
  },
  {
    path: 'mutual-fund', data: { menuCode: 'MY_MUTUAL_FUND' }, 
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', loadChildren: '../../../pages/mutual-fund/mutual-fund-summary.module#MutualFundSummaryModule', data: { menuCode: 'MY_MUTUAL_FUND.SUMMARY' }, canActivate: [AuthGuard] },
      { path: 'detail', loadChildren: '../../../pages/mutual-fund/mutual-fund-detail.module#MutualFundDetailModule', data: { menuCode: 'MY_MUTUAL_FUND.DETAIL' }, canActivate: [AuthGuard] }
    ]
  },
  { 
    path: 'kk-product-service', 
    loadChildren: '../../../pages/kk-product-and-service/web/rib/kk-product-and-service.module#KKProductAndServiceModule',
    canActivate: [AuthGuard], 
    data: { menuCode: 'KK_PRODUCT_SERVICE' } 
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });