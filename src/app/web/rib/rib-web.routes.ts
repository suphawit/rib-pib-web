import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { RIBWebContactUs } from '../../../pages/contact-us/web/rib/contact-us'
import { AuthGuard } from '../../../share/service/AuthGuard';
import { HomeComponent } from '../../../pages/home/web/rib/home.component';
import { RIBWebPromptPayRegisterComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register.component';
import { RIBWebPromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register-confirm.component';
import { RIBWebPromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-register-success.component';
import { ForgotResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password.component';
import { ForgotResetPasswordRequestRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-request-ref-code.component';
import { ForgotResetPasswordVerifyRefCodeComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-refcode.component';
import { ForgotResetPasswordVerifyOTPComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-verify-otp.component';
import { ForgotResetPasswordResetPasswordComponent } from '../../../pages/forgot-reset-password/web/rib/forgot-reset-password-reset-password.component';
import { RIBWebFAQ } from '../../../pages/faq/web/rib/faq';
import { RIBWebServices } from '../../../pages/services/web/rib/services';
import { RIBWebLocateUs } from '../../../pages/locate-us/web/rib/locate-us';
import { ChangeTermDepositBaseComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-base.component';
import { ChangeTermDepositSwitchTermComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-switch-term.component';
import { ChangeTermDepositSwitchTermConfirmComponent } from '../../../pages/term-deposit/web/rib/change-term-deposit-switch-term-confirm.component';
import { RIBWebLanguageSettings } from '../../../pages/language-settings/web/rib/language-settings';
import { RIBWebTermAndCondition } from '../../../pages/term-and-condition/web/rib/rib-web-term-and-condition.component';
import { MyAccountStatementPageComponent } from '../../../pages/my-account/web/rib/my-account-statement-page.component';
import { RIBWebChangePassword } from '../../../pages/change-password/web/rib/change-password';
import { RIBWebChangePasswordVerifyOTP } from '../../../pages/change-password/web/rib/change-password-verify-otp';
import { RIBWebChangePasswordNew } from '../../../pages/change-password/web/rib/change-password-new';
import { RIBWebPrivacyPolicy } from '../../../pages/privacy-policy/web/rib/privacy-policy';
import { OtherAccountAdd } from '../../../pages/other-account/web/rib/add/other-account-add.component';
import { OtherAccountAddConfirm } from '../../../pages/other-account/web/rib/add/other-account-add-confirm.component';
import { MyAccountListPageComponent } from '../../../pages/my-account/web/rib/my-account-list-page.component';
import { MyAccountDetailPageComponent } from '../../../pages/my-account/web/rib/my-account-detail-page.component';
import { OtherAccountEdit } from '../../../pages/other-account/web/rib/edit/other-account-edit.component';
import { OtherAccountListPageComponent } from '../../../pages/other-account/web/rib/other-account-list-page.component';
import { MyAccountAddComponent } from '../../../pages/my-account/web/rib/add/my-account-add.component';
import { MyAccountAddConfirmComponent } from '../../../pages/my-account/web/rib/add/my-account-add-confirm.component';
import { MyAccountEditComponent } from '../../../pages/my-account/web/rib/edit/my-account-edit.component';
import { MyAccountEditConfirmComponent } from '../../../pages/my-account/web/rib/edit/my-account-edit-confirm.component'
import { RIBFundTransfer } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer';
import { RIBFundTransferStep1 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step1';
import { RIBFundTransferStep2 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step2';
import { RIBFundTransferStep3 } from '../../../pages/fund-transfer/web/rib/rib-fund-transfer-step3';
import { OtherAccountDetailPageComponent } from '../../../pages/other-account/other-account-detail-page-component';
import { BillerListPageComponent } from '../../../pages/bill-payment/web/rib/biller-list-page.component';
import { BillerAdd } from '../../../pages/bill-payment/web/rib/add/biller-add';
import { BillerEdit } from '../../../pages/bill-payment/web/rib/edit/biller-edit';
import { BillerAddConfirm } from '../../../pages/bill-payment/web/rib/add/biller-add-confirm';
import { BillerEditConfirm } from '../../../pages/bill-payment/web/rib/edit/biller-edit-confirm';
import { BillerDetailPageComponent } from '../../../pages/bill-payment/biller-detail-page-component';
import { OtherAccountEditConfirm } from '../../../pages/other-account/web/rib/edit/other-account-edit-confirm.component';
import { TransactionHistoryPageComponent } from '../../../pages/transaction-history/web/rib/transaction-history-page.component';
import { SchedulePageComponent } from '../../../pages/schedule/web/rib/schedule-page.component';
import { RIBBillPayment } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment';
import { RIBBillPaymentStep1 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step1';
import { RIBBillPaymentStep2 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step2';
import { RIBBillPaymentStep3 } from '../../../pages/bill-payment/web/rib/bill/rib-bill-payment-step3';
import { MutualFundSummaryComponent } from '../../../pages/mutual-fund/mutual-fund-summary.component';
import { MutualFundDetailComponent } from '../../../pages/mutual-fund/mutual-fund-detail.component';
import { RIBWebKKProductAndServicePage } from '../../../pages/kk-product-and-service/web/rib/kk-product-and-service.component';
import { RIBMenuRoot } from '../../../pages/main-layout/web/rib/main-menu';

import { BillerRequestToPayListPage } from '../../../pages/bill-payment-request-to-pay/web/rib/biller-list-page';
import { BillerRequestToPayDetail } from '../../../pages/bill-payment-request-to-pay/web/biller-detail';
import { BillerRequestToPayAddConfirm } from '../../../pages/bill-payment-request-to-pay/web/rib/add/biller-request-to-pay-add-confirm';
import { BillerRequestToPayEdit } from '../../../pages/bill-payment-request-to-pay/web/rib/edit/biller-request-to-pay-edit';
import { BillerRequestToPayEditConfirm } from '../../../pages/bill-payment-request-to-pay/web/rib/edit/biller-request-to-pay-edit-confirm';
import { RIBRequestToPayListPageComponent } from '../../../pages/request-to-pay/web/rib/rib-request-to-pay-list-page.component';
import { AddRequestToPayStep1 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step1.component';
import { AddRequestToPayStep2 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step2.component';
import { AddRequestToPayStep3 } from '../../../pages/request-to-pay/web/rib/add-request-to-pay-step3.component';
import { RIBWebQRGeneratorComponent } from "../../../pages/qr-generator/web/rib/rib-web-qr-generator.component";
import { RIBWebQRGeneratorCompleteComponent } from "../../../pages/qr-generator/web/rib/rib-web-qr-generator-complete.component";
import { ManageBillerAddRIB } from '../../../pages/bill-payment-request-to-pay/manage-biller-add/manage-biller-add-rib';
import { PromptPayAccountDetailComponent } from '../../../pages/prompt-pay/prompt-pay-account-detail.component';
import { RIBWebDashboardComponent } from '../../../pages/dashboard/web/rib/rib-web-dashboard.component';
import { PromptPayAccountListComponent } from '../../../pages/prompt-pay/prompt-pay-account-list.component';
import { ActivateAccountByProductsStep1Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step1.component';
import { ActivateAccountByProductsStep2Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step2.component';
import { ActivateAccountByProductsStep3Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step3.component';
import { ActivateAccountByProductsStep4Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step4.component';
import { ActivateAccountByProductsStep5Component } from '../../../pages/activate-account/web/rib/products/pages/activate-account-products-step5.component';
import { ActivateAccountByDebitcardStep1Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step1.component';
import { ActivateAccountByDebitcardStep2Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step2.component';
import { ActivateAccountByDebitcardStep3Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step3.component';
import { ActivateAccountByDebitcardStep4Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step4.component';
import { ActivateAccountByDebitcardStep5Component } from '../../../pages/activate-account/web/rib/debitcard/pages/activate-account-debitcard-step5.component';
import { ActivateAccountByRefcodeStep1Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step1.component';
import { ActivateAccountByRefcodeStep2Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step2.component';
import { ActivateAccountByRefcodeStep3Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step3.component';
import { ActivateAccountByRefcodeStep4Component } from '../../../pages/activate-account/web/rib/reference-code/pages/activate-account-refcode-step4.component';
import { ForgotUsernameByProductsStep1Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step1.component';
import { ForgotUsernameByProductsStep2Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step2.component';
import { ForgotUsernameByProductsStep3Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step3.component';
import { ForgotUsernameByProductsStep4Component } from '../../../pages/forgot-username/web/rib/products/pages/forgot-username-products-step4.component';
import { ForgotUsernameByDebitcardStep1Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step1.component';
import { ForgotUsernameByDebitcardStep2Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step2.component';
import { ForgotUsernameByDebitcardStep3Component } from '../../../pages/forgot-username/web/rib/debitcard/pages/forgot-username-debitcard-step3.component';
import { ForgotUsernameByRefcodeStep1Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step1.component';
import { ForgotUsernameByRefcodeStep2Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step2.component';
import { ForgotUsernameByRefcodeStep3Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step3.component';
import { ForgotUsernameByRefcodeStep4Component } from '../../../pages/forgot-username/web/rib/reference-code/pages/forgot-username-refcode-step4.component';// Route Configuration
import { RIBRequestToPayBlockListComponent } from '../../../pages/request-to-pay/web/rib/rib-request-to-pay-block-list.component';
import { RIBWebPromptPayEditComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account.component';
import { RIBWebPromptPayEditConfirmComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account-confirm.component';
import { RIBWebPromptPayEditCompleteComponent } from '../../../pages/prompt-pay/web/rib/rib-web-prompt-pay-edit-account-complete.component';
import { ChangeUsernameStep1Component } from '../../../pages/change-username/web/rib/change-username-step1.component';
import { ChangeUsernameStep2Component } from '../../../pages/change-username/web/rib/change-username-step2.component';
import { ManageDeviceComponent } from '../../../pages/manage-device/manage-device.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { menuCode: "HOME" } },
  { path: 'contact-us', component: RIBWebContactUs, data: { menuCode: 'CONTRACTUS' }/*, canActivate: [AuthGuard] */ },
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
  { path: 'faq', component: RIBWebFAQ, data: { menuCode: 'FAQ' } },
  { path: 'services', component: RIBWebServices, data: { menuCode: 'SERVICES' } },
  { path: 'locate-us', component: RIBWebLocateUs, data: { menuCode: 'LOCATEUS' } },
  {
    path: 'ribpromptpay',
    children: [
      {
        path: '',
        redirectTo: 'rib-web-prompt-pay-register', pathMatch: 'full'
      },
      { path: 'rib-web-prompt-pay-register', component: RIBWebPromptPayRegisterComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY' }, canActivate: [AuthGuard] },
      { path: 'rib-web-prompt-pay-register-confirm', component: RIBWebPromptPayRegisterConfirmComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP2' }, canActivate: [AuthGuard] },
      { path: 'rib-web-prompt-pay-register-success', component: RIBWebPromptPayRegisterSuccessComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP3' }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'change-term', component: ChangeTermDepositBaseComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'TD-switch-term', pathMatch: 'full'
      },
      { path: 'TD-switch-term', component: ChangeTermDepositSwitchTermComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD' }, canActivate: [AuthGuard] },
      { path: 'TD-switch-term-confirm', component: ChangeTermDepositSwitchTermConfirmComponent, data: { menuCode: 'MY_ACCOUNTS.CHANGETERM_TD_CONFIRM' }, canActivate: [AuthGuard] },
    ]
  },
    { path: 'language-settings', component: RIBWebLanguageSettings, data: { menuCode: 'CHANGE_LANGUAGE' } },
  { path: 'term-and-condition', component: RIBWebTermAndCondition, data: { menuCode: 'Terms' } },

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
  { path: 'privacy-policy', component: RIBWebPrivacyPolicy, data: { menuCode: 'activate' } },
  { path: 'list-other-account', component: OtherAccountListPageComponent, data: { menuCode: 'OTHER_ACCOUNTS' }, canActivate: [AuthGuard] },

  {
    path: 'add-other-account',
    children: [
      { path: 'step1', component: OtherAccountAdd, data: { menuCode: 'OTHER_ACCOUNTS.add1' }, canActivate: [AuthGuard] },
      { path: 'step2', component: OtherAccountAddConfirm, data: { menuCode: 'OTHER_ACCOUNTS.add2' }, canActivate: [AuthGuard] },
    ]
  },
   {
    path: 'edit-other-account',
    children: [
      { path: 'step1', component: OtherAccountEdit, data: { menuCode: 'OTHER_ACCOUNTS.edit1' } ,canActivate: [AuthGuard] },
      { path: 'step2', component: OtherAccountEditConfirm,data: { menuCode: 'OTHER_ACCOUNTS.edit2' }, canActivate: [AuthGuard] }
    ]
  },
  // {
  //   path: 'add-my-account',
  //   component: MyAccountAddComponent,
  //   data: { menuCode: 'MY_DEPOSITS.ADD' }, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'add-my-account-confirm',
  //   component: MyAccountAddConfirmComponent,
  //   data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' }, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'edit-my-account',
  //   component: MyAccountEditComponent,
  //   data: { menuCode: 'MY_ACCOUNTS.EDIT' }, canActivate: [AuthGuard]
  // },
  // {
  //   path: 'edit-my-account-confirm',
  //   component: MyAccountEditConfirmComponent,
  //   data: { menuCode: 'MY_ACCOUNTS.EDIT_CONFIRM' }, canActivate: [AuthGuard]
  // },
  {
    path: 'dashboard', data: { menuCode: 'DASHBOARD' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-deposit', pathMatch: 'full'
      },
      { path: 'my-deposit', component: RIBWebDashboardComponent, data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard] },
      { path: 'detail', component: MyAccountDetailPageComponent, data: { menuCode: 'MY_DEPOSITS.DETAIL', canActivate: [AuthGuard] } },
      {
        path: 'add-my-account',
        component: MyAccountAddComponent,
        data: { menuCode: 'MY_DEPOSITS.ADD' }, canActivate: [AuthGuard]
      },
      {
        path: 'add-my-account-confirm',
        component: MyAccountAddConfirmComponent,
        data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account',
        component: MyAccountEditComponent,
        data: { menuCode: 'MY_DEPOSITS.EDIT' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account-confirm',
        component: MyAccountEditConfirmComponent,
        data: { menuCode: 'MY_DEPOSITS.EDIT_CONFIRM' }, canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'my-account', data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'my-deposit', pathMatch: 'full'
      },
      { path: 'my-deposit', component: MyAccountListPageComponent, data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard] },
      { path: 'detail', component: MyAccountDetailPageComponent, data: { menuCode: 'MY_DEPOSITS.DETAIL' }, canActivate: [AuthGuard] },
      { path: 'statement', component: MyAccountStatementPageComponent, data: { menuCode: 'MY_DEPOSITS.STATEMENT' }, canActivate: [AuthGuard] },
      {
        path: 'add-my-account',
        component: MyAccountAddComponent,
        data: { menuCode: 'MY_DEPOSITS.ADD' }, canActivate: [AuthGuard]
      },
      {
        path: 'add-my-account-confirm',
        component: MyAccountAddConfirmComponent,
        data: { menuCode: 'MY_DEPOSITS.ADD_CONFIRM' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account',
        component: MyAccountEditComponent,
        data: { menuCode: 'MY_DEPOSITS.EDIT' }, canActivate: [AuthGuard]
      },
      {
        path: 'edit-my-account-confirm',
        component: MyAccountEditConfirmComponent,
        data: { menuCode: 'MY_DEPOSITS.EDIT_CONFIRM' }, canActivate: [AuthGuard]
      },
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
  { path: 'other-account-detail', component: OtherAccountDetailPageComponent, data: { menuCode: 'OTHER_ACCOUNTS.DETAIL' }, canActivate: [AuthGuard] },
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
      { path: 'biller-list', component: BillerListPageComponent, data: { menuCode: 'MANAGE_BILLER.LIST' }, canActivate: [AuthGuard] },
      { path: 'biller-detail', component: BillerDetailPageComponent, data: { menuCode: 'MANAGE_BILLER.DETAIL' }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'manage-bill-add', data: { menuCode: 'MANAGE_BILLER.ADD' }, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'verify-add', pathMatch: 'full' },
      { path: 'verify-add', component: BillerAdd, data: { menuCode: 'MANAGE_BILLER.ADD_VERIFY' }, canActivate: [AuthGuard] },
      { path: 'confirm-add', component: BillerAddConfirm, data: { menuCode: 'MANAGE_BILLER.ADD_CONFIRM' }, canActivate: [AuthGuard] },
    ]
  },
  {
    path: 'manage-bill-edit', data: { menuCode: 'MANAGE_BILLER.EDIT' }, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'verify-add', pathMatch: 'full' },
      { path: 'verify-edit', component: BillerEdit, data: { menuCode: 'MANAGE_BILLER.EDIT_VERIFY' }, canActivate: [AuthGuard] },
      { path: 'confirm-add', component: BillerEditConfirm, data: { menuCode: 'MANAGE_BILLER.EDIT_CONFIRM' }, canActivate: [AuthGuard] },
    ]
  },
 
  { path: 'manage-schedule', component: SchedulePageComponent, data: { menuCode: 'MANAGE_SCHEDULE' }, canActivate: [AuthGuard] },
  { path: 'transaction-history', component: TransactionHistoryPageComponent, data: { menuCode: 'TRANSACTION_HISTORY' }, canActivate: [AuthGuard] },
  {
    path: 'mutual-fund', data: { menuCode: 'MY_MUTUAL_FUND' }, 
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: MutualFundSummaryComponent, data: { menuCode: 'MY_MUTUAL_FUND.SUMMARY' }, canActivate: [AuthGuard] },
      { path: 'detail', component: MutualFundDetailComponent, data: { menuCode: 'MY_MUTUAL_FUND.DETAIL' }, canActivate: [AuthGuard] }
    ]
  },
  { path: 'kk-product-service', component: RIBWebKKProductAndServicePage, data: { menuCode: 'KK_PRODUCT_SERVICE' }, canActivate: [AuthGuard] },
  { path: 'biller-list', component: BillerRequestToPayListPage, data: { menuCode: 'MANAGE_BILLER' }, canActivate: [AuthGuard] },
  { path: 'biller-detail', component: BillerRequestToPayDetail, data: { menuCode: 'MANAGE_BILLER.detail' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-add', component: ManageBillerAddRIB, data: { menuCode: 'MANAGE_BILLER.add' }, canActivate: [AuthGuard]},
  { path: 'bill-payment-request-to-pay-add-confirm', component: BillerRequestToPayAddConfirm, data: { menuCode: 'MANAGE_BILLER.add-confirm' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-edit', component: BillerRequestToPayEdit, data: { menuCode: 'MANAGE_BILLER.edit' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-edit-confirm', component: BillerRequestToPayEditConfirm, data: { menuCode: 'MANAGE_BILLER.edit-confirm' }, canActivate: [AuthGuard] },
  { path: 'request-to-pay', component: RIBRequestToPayListPageComponent, data: { menuCode: 'RTP_RECEIVE' }, canActivate: [AuthGuard]},
  { path: 'my-request-to-pay', component: RIBRequestToPayListPageComponent, data: { menuCode: 'MY_RTP' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay', component: AddRequestToPayStep1, data: { menuCode: 'MY_RTP.ADD' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay-confirm', component: AddRequestToPayStep2, data: { menuCode: 'MY_RTP.ADD_CONFIRM' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay-complete', component: AddRequestToPayStep3, data: { menuCode: 'MY_RTP.ADD_COMPLETE' }, canActivate: [AuthGuard]},
  { path: 'qr-generator', component: RIBWebQRGeneratorComponent, data: { menuCode: 'QR_GENERATOR' }, canActivate: [AuthGuard]},
  { path: 'qr-generator-complete', component: RIBWebQRGeneratorCompleteComponent, data: { menuCode: 'QR_GENERATOR.COMPLETE' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-detail', component: PromptPayAccountDetailComponent, data: { menuCode: 'MY_KK_PROMPTPAY.DETAIL' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-list', component: PromptPayAccountListComponent, data: { menuCode: 'MY_KK_PROMPTPAY' }, canActivate: [AuthGuard]},
  { path: 'account-activate-refcode1', component: ActivateAccountByRefcodeStep1Component, data: { menuCode: 'account-activate-refcode1' } },
  { path: 'account-activate-refcode2', component: ActivateAccountByRefcodeStep2Component, data: { menuCode: 'account-activate-refcode2' } },
  { path: 'account-activate-refcode3', component: ActivateAccountByRefcodeStep3Component, data: { menuCode: 'account-activate-refcode3' } },
  { path: 'account-activate-refcode4', component: ActivateAccountByRefcodeStep4Component, data: { menuCode: 'account-activate-refcode4' } },
  { path: 'account-activate-debitcard1', component: ActivateAccountByDebitcardStep1Component, data: { menuCode: 'account-activate-debitcard1' } },
  { path: 'account-activate-debitcard2', component: ActivateAccountByDebitcardStep2Component, data: { menuCode: 'account-activate-debitcard2' } },
  { path: 'account-activate-debitcard3', component: ActivateAccountByDebitcardStep3Component, data: { menuCode: 'account-activate-debitcard3' } },
  { path: 'account-activate-debitcard4', component: ActivateAccountByDebitcardStep4Component, data: { menuCode: 'account-activate-debitcard4' } },
  { path: 'account-activate-debitcard5', component: ActivateAccountByDebitcardStep5Component, data: { menuCode: 'account-activate-debitcard5' } },
  { path: 'account-activate-products1', component: ActivateAccountByProductsStep1Component, data: { menuCode: 'account-activate-products1' } },
  { path: 'account-activate-products2', component: ActivateAccountByProductsStep2Component, data: { menuCode: 'account-activate-products2' } },
  { path: 'account-activate-products3', component: ActivateAccountByProductsStep3Component, data: { menuCode: 'account-activate-products3' } },
  { path: 'account-activate-products4', component: ActivateAccountByProductsStep4Component, data: { menuCode: 'account-activate-products4' } },
  { path: 'account-activate-products5', component: ActivateAccountByProductsStep5Component, data: { menuCode: 'account-activate-products5' } },
  { path: 'forgot-username-refcode1', component: ForgotUsernameByRefcodeStep1Component, data: { menuCode: 'forgotUserName-refcode1' } },
  { path: 'forgot-username-refcode2', component: ForgotUsernameByRefcodeStep2Component, data: { menuCode: 'forgotUserName-refcode2' } },
  { path: 'forgot-username-refcode3', component: ForgotUsernameByRefcodeStep3Component, data: { menuCode: 'forgotUserName-refcode3' } },
  { path: 'forgot-username-refcode4', component: ForgotUsernameByRefcodeStep4Component, data: { menuCode: 'forgotUserName-refcode4' } },
  { path: 'forgot-username-debitcard1', component: ForgotUsernameByDebitcardStep1Component, data: { menuCode: 'forgotUserName-debitcard1' } },
  { path: 'forgot-username-debitcard2', component: ForgotUsernameByDebitcardStep2Component, data: { menuCode: 'forgotUserName-debitcard2' } },
  { path: 'forgot-username-debitcard3', component: ForgotUsernameByDebitcardStep3Component, data: { menuCode: 'forgotUserName-debitcard3' } },
  { path: 'forgot-username-products1', component: ForgotUsernameByProductsStep1Component, data: { menuCode: 'forgotUserName-products1' } },
  { path: 'forgot-username-products2', component: ForgotUsernameByProductsStep2Component, data: { menuCode: 'forgotUserName-products2' } },
  { path: 'forgot-username-products3', component: ForgotUsernameByProductsStep3Component, data: { menuCode: 'forgotUserName-products3' } },
  { path: 'forgot-username-products4', component: ForgotUsernameByProductsStep4Component, data: { menuCode: 'forgotUserName-products4' } },
  { path: 'prompt-pay-detail', component: PromptPayAccountDetailComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.DETAIL' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-list', component: PromptPayAccountListComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.LIST' }, canActivate: [AuthGuard]},
  { path: 'rtp-block-list', component: RIBRequestToPayBlockListComponent, data: { menuCode: 'RTP_BLOCK_LIST' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit', component: RIBWebPromptPayEditComponent, data: { menuCode: 'MY_KK_PROMPTPAY.EDIT' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit-confirm', component: RIBWebPromptPayEditConfirmComponent, data: {  menuCode: 'MY_KK_PROMPTPAY.EDIT_CONFIRM' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit-complete', component: RIBWebPromptPayEditCompleteComponent, data: {  menuCode: 'MY_KK_PROMPTPAY.EDIT_COMPLETE' }, canActivate: [AuthGuard]},
  { path: 'change-username-step1', component: ChangeUsernameStep1Component, data: { menuCode: 'CHANGE_USERNAME' } },
  { path: 'change-username-step2', component: ChangeUsernameStep2Component, data: { menuCode: 'CHANGE_USERNAME.step2' } },
  { path: 'manage-device', component: ManageDeviceComponent, data: { menuCode: 'DEVICE_MANAGEMENT' } }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });