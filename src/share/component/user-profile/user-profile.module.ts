import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';

import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
      CommonModule, 
      TranslateModule
    ],
  declarations: [
      UserProfileComponent
  ],
  exports: [
      UserProfileComponent
  ]
})
export class UserProfileModule { }