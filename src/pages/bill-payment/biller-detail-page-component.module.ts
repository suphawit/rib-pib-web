import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "ng2-translate";
import { BillerDetailPageComponent } from "./biller-detail-page-component";
import { AlertMessageModule } from "../../share/component/alert-message/alert-message.module";
import { PortietsMenuModule } from "../../share/component/portlets-menu/portlets-menu.module";
import { MessageModalDeleteBillerComponent } from "./modal-messages-delete-biller.component";
import { ModalModule } from "ng2-bootstrap/modal";
import { BillerDetailPageRoute } from "./biller-detail-page-component.route";
@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AlertMessageModule,
        PortietsMenuModule,
        ModalModule
    ],
    declarations: [
        BillerDetailPageComponent,
        MessageModalDeleteBillerComponent
    ],
    exports: [
        BillerDetailPageComponent,
        MessageModalDeleteBillerComponent
    ],
    providers: [
    ]
})
export class BillerDetailPageModule {
}