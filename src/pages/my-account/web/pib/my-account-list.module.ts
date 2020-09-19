import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { TranslateModule } from 'ng2-translate';

import { AlertMessageModule } from '../../../../share/component/alert-message/alert-message.module';
import { PipesModule } from '../../../../share/pipe/pipe.module';
import { MyAccountDetailModule } from './my-account-detail.module';

import { MyAccountService } from '../../my-account.service';
import { MyAccountListPageComponent } from './my-account-list-page.component';
import { MyAccountListComponent, MyAccountTypePipe } from '../../my-account-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    AlertMessageModule,
    PipesModule,
    MyAccountDetailModule
  ],
  declarations: [
      MyAccountListPageComponent,
      MyAccountListComponent,
      MyAccountTypePipe
  ],
  exports: [
      MyAccountListPageComponent,
      MyAccountListComponent,
      MyAccountTypePipe
  ]
})
export class MyAccountListModule {
    static forRoot(): ModuleWithProviders { return {ngModule: MyAccountListModule, providers: [MyAccountService]}; }
}