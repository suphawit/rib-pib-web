import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'ng2-translate';
import { MessageModalComponent } from "./modal-messages.component";
import { ModalModule } from "ng2-bootstrap/modal";

@NgModule({
  imports: [
      CommonModule, 
      TranslateModule,
      ModalModule
    ],
  declarations: [
    MessageModalComponent
  ],
  exports: [
    MessageModalComponent
  ],
  providers: [
  ]
})
export class ModalMessagesModule { }