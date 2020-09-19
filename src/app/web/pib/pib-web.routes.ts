import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../../pages/login/pib/web/login';
import { AuthGuard } from '../../../share/service/AuthGuard';
import { PIBFundTransfer } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer';
import { PIBFundTransferStep1 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step1';
import { PIBFundTransferStep2 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step2';
import { PIBFundTransferStep3 } from '../../../pages/fund-transfer/web/pib/pib-fund-transfer-step3';
import { HalfAuthGuard } from '../../../share/service/AuthGuard';
import { PIBWebTermAndCondition } from '../../../pages/term-and-condition/web/pib/pib-web-term-and-condition.component';
import { TermAndConAfterLogin } from '../../../pages/term-and-condition/web/pib/tc-after-login.component';
import { PIBWebPromptPayRegisterComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register.component';
import { PIBWebPromptPayRegisterConfirmComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register-confirm.component';
import { PIBWebPromptPayRegisterSuccessComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-register-success.component';
import { OtherAccountAddComponent } from '../../../pages/other-account/web/pib/add/other-account-add.component';
import { OtherAccountAddConfirmComponent } from '../../../pages/other-account/web/pib/add/other-account-add-confirm.component';
import { OtherAccountListPageComponent } from '../../../pages/other-account/web/pib/other-account-list-page.component';
import { MyAccountAddComponent } from '../../../pages/my-account/web/pib/add/my-account-add.component';
import { MyAccountAddConfirmComponent } from '../../../pages/my-account/web/pib/add/my-account-add-confirm.component';
import { MyAccountEditComponent } from '../../../pages/my-account/web/pib/edit/my-account-edit.component';
import { MyAccountEditConfirmComponent } from '../../../pages/my-account/web/pib/edit/my-account-edit-confirm.component'
import { MyAccountDetailPageComponent } from '../../../pages/my-account/web/pib/my-account-detail-page.component';
import { MyAccountListPageComponent } from '../../../pages/my-account/web/pib/my-account-list-page.component';
import { MyAccountStatementPageComponent } from '../../../pages/my-account/web/pib/my-account-statement-page.component';
import { OtherAccountDetailPageComponent } from '../../../pages/other-account/other-account-detail-page-component';
import { OtherAccountEditComponent } from '../../../pages/other-account/web/pib/edit/other-account-edit.component';
import { OtherAccountEditConfirmComponent } from '../../../pages/other-account/web/pib/edit/other-account-edit-confirm.component';
import { TransactionHistoryPageComponent } from '../../../pages/transaction-history/web/pib/transaction-history-page.component';
import { SchedulePageComponent } from '../../../pages/schedule/web/pib/schedule-page.component';
import { PIBWebKKProductAndServicePage } from '../../../pages/kk-product-and-service/web/pib/kk-product-and-service.component';
import { DisclaimerWeb } from '../../../pages/disclaimer/web/pib/disclaimer-web';
import { LandingPagePIB } from '../../../pages/landing-page/web/pib/landing-page';
import { PIBBillPaymentStep1 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step1';
import { PIBBillPaymentStep2 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step2';
import { PIBBillPaymentStep3 } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment-step3';
import { PIBBillPayment } from '../../../pages/bill-payment/web/pib/bill/pib-bill-payment';
import { BillerRequestToPayListPage } from '../../../pages/bill-payment-request-to-pay/web/pib/biller-list-page';
import { BillerRequestToPayDetail } from '../../../pages/bill-payment-request-to-pay/web/biller-detail';
import { BillerRequestToPayAdd } from '../../../pages/bill-payment-request-to-pay/web/pib/add/biller-request-to-pay-add';
import { BillerRequestToPayAddConfirm } from '../../../pages/bill-payment-request-to-pay/web/pib/add/biller-request-to-pay-add-confirm';
import { BillerRequestToPayEdit } from '../../../pages/bill-payment-request-to-pay/web/pib/edit/biller-request-to-pay-edit';
import { BillerRequestToPayEditConfirm } from '../../../pages/bill-payment-request-to-pay/web/pib/edit/biller-request-to-pay-edit-confirm';
import { PIBRequestToPayListPageComponent } from '../../../pages/request-to-pay/web/pib/pib-request-to-pay-list-page.component';
import { AddRequestToPayStep1 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step1.component';
import { AddRequestToPayStep2 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step2.component';
import { AddRequestToPayStep3 } from '../../../pages/request-to-pay/web/pib/add-request-to-pay-step3.component';
import { PIBWebQRGeneratorComponent } from "../../../pages/qr-generator/web/pib/pib-web-qr-generator.component";
import { PIBWebQRGeneratorCompleteComponent } from "../../../pages/qr-generator/web/pib/pib-web-qr-generator-complete.component";
import { ManageBillerAddPIB } from '../../../pages/bill-payment-request-to-pay/manage-biller-add/manage-biller-add-pib';
import { PromptPayAccountDetailComponent } from '../../../pages/prompt-pay/prompt-pay-account-detail.component';
import { PromptPayAccountListComponent } from '../../../pages/prompt-pay/prompt-pay-account-list.component';
import { PIBRequestToPayBlockListComponent } from '../../../pages/request-to-pay/web/pib/pib-request-to-pay-block-list.component';
import { PIBWebPromptPayEditComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account.component';
import { PIBWebPromptPayEditConfirmComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account-confirm.component';
import { PIBWebPromptPayEditCompleteComponent } from '../../../pages/prompt-pay/web/pib/pib-web-prompt-pay-edit-account-complete.component';// Route Configuration
export const pibRoutes: Routes = [
  //{ path: 'login/:token', component: LoginComponent },
  { path: 'authentication/:token/:language', component: LoginComponent, data: { menuCode: 'login' } },
  { path: 'login', component: LoginComponent, data: { menuCode: 'login' } },
  // { path: '', redirectTo: '/authentication/123432/en', pathMatch: 'full' },
  // { path: 'login', redirectTo: '/authentication/123432/en', pathMatch: 'full' },
  {
    path: 'promptpay',
    children: [
      { path: 'pib-web-prompt-pay-register', component: PIBWebPromptPayRegisterComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY' }, canActivate: [AuthGuard] },
      { path: 'pib-web-prompt-pay-register-confirm', component: PIBWebPromptPayRegisterConfirmComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP2' }, canActivate: [AuthGuard] },
      { path: 'pib-web-prompt-pay-register-success', component: PIBWebPromptPayRegisterSuccessComponent, data: { menuCode: 'KK_PRODUCT_SERVICE.REGISTER_KK_PROMPT_PAY_STEP3' }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'transfer', component: PIBFundTransfer,
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: PIBFundTransferStep1, data: { menuCode: 'FUND_TRANSFER' }, canActivate: [AuthGuard] },
      { path: 'step2', component: PIBFundTransferStep2, data: { menuCode: 'FUND_TRANSFER.CONFIRM' }, canActivate: [AuthGuard] },
      { path: 'step3', component: PIBFundTransferStep3, data: { menuCode: 'FUND_TRANSFER.COMPLETE' }, canActivate: [AuthGuard] }
    ]
  },
  {
    path: 'my-account',
    children: [
      { path: '', redirectTo: 'my-deposit', pathMatch: 'full' },
      { path: 'my-deposit', component: MyAccountListPageComponent, data: { menuCode: 'MY_DEPOSITS' }, canActivate: [AuthGuard] },
      { path: 'detail', component: MyAccountDetailPageComponent, data: { menuCode: 'MY_DEPOSITS.DETAIL' }, canActivate: [AuthGuard] },
      { path: 'statement', component: MyAccountStatementPageComponent, data: { menuCode: 'MY_DEPOSITS.STATEMENT' }, canActivate: [AuthGuard] }
    ]
  },
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
  { path: 'accept-term-and-condition', component: TermAndConAfterLogin, canActivate: [HalfAuthGuard], data: { menuCode: 'AcceptTermsAndcontdition' } },
  { path: 'pib-term-and-condition', component: PIBWebTermAndCondition, data: { menuCode: 'Terms' } },
  {
    path: 'add-other-account',
    children: [
      { path: 'step1', component: OtherAccountAddComponent, data: { menuCode: 'OTHER_ACCOUNTS.add1' }, canActivate: [AuthGuard] },
      { path: 'step2', component: OtherAccountAddConfirmComponent, data: { menuCode: 'OTHER_ACCOUNTS.add2' }, canActivate: [AuthGuard] }
    ]
  },
  { path: 'list-other-account', component: OtherAccountListPageComponent, data: { menuCode: 'OTHER_ACCOUNTS' }, canActivate: [AuthGuard] },
  { path: 'other-account-detail', component: OtherAccountDetailPageComponent, data: { menuCode: 'OTHER_ACCOUNTS.DETAIL' }, canActivate: [AuthGuard] },
  { path: 'edit-other-account', component: OtherAccountEditComponent, canActivate: [AuthGuard] },
  { path: 'manage-schedule', component: SchedulePageComponent, data: { menuCode: 'MANAGE_SCHEDULE' }, canActivate: [AuthGuard] },
  { path: 'transaction-history', component: TransactionHistoryPageComponent, data: { menuCode: 'TRANSACTION_HISTORY' }, canActivate: [AuthGuard] },
  {
    path: 'edit-other-account',
    children: [
      { path: 'step1', component: OtherAccountEditComponent, data: { menuCode: 'OTHER_ACCOUNTS.edit1' }, canActivate: [AuthGuard] },
      { path: 'step2', component: OtherAccountEditConfirmComponent, data: { menuCode: 'OTHER_ACCOUNTS.edit2' }, canActivate: [AuthGuard] }
    ]
  },
  { path: 'kk-product-service', component: PIBWebKKProductAndServicePage, canActivate: [AuthGuard], data: { menuCode: 'KK_PRODUCT_SERVICE' } },
  { path: 'disclaimer', component: DisclaimerWeb, data: { menuCode: 'DISCLAIMER' } },
  { path: 'landing-page', component: LandingPagePIB, data: { menuCode: 'LANDING_PAGE' } },
  { path: 'biller-list', component: BillerRequestToPayListPage, data: { menuCode: 'MANAGE_BILLER' }, canActivate: [AuthGuard] },
  { path: 'biller-detail', component: BillerRequestToPayDetail, data: { menuCode: 'MANAGE_BILLER.detail' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-add', component: ManageBillerAddPIB, data: { menuCode: 'MANAGE_BILLER.add' }, canActivate: [AuthGuard]},
  { path: 'bill-payment-request-to-pay-add-confirm', component: BillerRequestToPayAddConfirm, data: { menuCode: 'MANAGE_BILLER.add-confirm' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-edit', component: BillerRequestToPayEdit, data: { menuCode: 'MANAGE_BILLER.edit' }, canActivate: [AuthGuard] },
  { path: 'bill-payment-request-to-pay-edit-confirm', component: BillerRequestToPayEditConfirm, data: { menuCode: 'MANAGE_BILLER.edit-confirm' }, canActivate: [AuthGuard] },
  {
    path: 'bill-payment', component: PIBBillPayment, //canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'step1', pathMatch: 'full' },
      { path: 'step1', component: PIBBillPaymentStep1, data: { menuCode: 'PAY_BILL' }, canActivate: [AuthGuard] },
      { path: 'step2', component: PIBBillPaymentStep2, data: { menuCode: 'PAY_BILL.STEP2' }, canActivate: [AuthGuard] },
      { path: 'step3', component: PIBBillPaymentStep3, data: { menuCode: 'PAY_BILL.STEP3' }, canActivate: [AuthGuard] }
    ]
  },
  { path: 'request-to-pay', component: PIBRequestToPayListPageComponent, data: { menuCode: 'RTP_RECEIVE' }, canActivate: [AuthGuard]},
  { path: 'my-request-to-pay', component: PIBRequestToPayListPageComponent, data: { menuCode: 'MY_RTP' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay', component: AddRequestToPayStep1, data: { menuCode: 'MY_RTP.ADD' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay-confirm', component: AddRequestToPayStep2, data: { menuCode: 'MY_RTP.ADD_CONFIRM' }, canActivate: [AuthGuard]},
  { path: 'add-my-request-to-pay-complete', component: AddRequestToPayStep3, data: { menuCode: 'MY_RTP.ADD_COMPLETE' }, canActivate: [AuthGuard]},
  { path: 'qr-generator', component: PIBWebQRGeneratorComponent, data: { menuCode: 'QR_GENERATOR' }, canActivate: [AuthGuard]},
  { path: 'qr-generator-complete', component: PIBWebQRGeneratorCompleteComponent, data: { menuCode: 'QR_GENERATOR.COMPLETE' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-detail', component: PromptPayAccountDetailComponent, data: { menuCode: 'MY_KK_PROMPTPAY.DETAIL' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-list', component: PromptPayAccountListComponent, data: { menuCode: 'MY_KK_PROMPTPAY' }, canActivate: [AuthGuard]},
  { path: 'rtp-block-list', component: PIBRequestToPayBlockListComponent, data: { menuCode: 'RTP_BLOCK_LIST' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit', component: PIBWebPromptPayEditComponent, data: { menuCode: 'MY_KK_PROMPTPAY.EDIT' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit-confirm', component: PIBWebPromptPayEditConfirmComponent, data: {  menuCode: 'MY_KK_PROMPTPAY.EDIT_CONFIRM' }, canActivate: [AuthGuard]},
  { path: 'prompt-pay-edit-complete', component: PIBWebPromptPayEditCompleteComponent, data: {  menuCode: 'MY_KK_PROMPTPAY.EDIT_COMPLETE' }, canActivate: [AuthGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(pibRoutes, { useHash: true });