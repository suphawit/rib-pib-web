import { Constants } from '../../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import { MasterDataService } from '../../../share/service/master-data.service';
import { RequestToPayService } from '../../../pages/request-to-pay/request-to-pay.service';
import { PermissionChangeRoute } from '../../../share/service/permission.service';
import { ModalRTPBlockListComponent } from './modal-rtp-block-list.component';
import { AlertMessageComponent } from '../../../share/component/alert-message/alert-message.component';
import { UtilService } from '../../../share/service/util.service';

export class RequestToPayBlockListComponent implements OnInit{
    private accountLists: any;
    private alertConfig: { title: string, type: string, message: string, show: boolean, option: any };
    messageModalData: { title: string; body: string; size: string; action: any; accountAliasName: string, accountNumber: string, config: string };
    selectedUnBlockAccount: any;
    isHidden: boolean = false;
    @ViewChild('messageModal') public messageModal: ModalRTPBlockListComponent;
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    constructor(public constants: Constants,
        public translateService: TranslateService,
        public masterDataService: MasterDataService,
        public requestToPayService: RequestToPayService,
        public permissionChangeRoute: PermissionChangeRoute,
        public utilService: UtilService) {
    }

    ngOnInit(): void {

        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.messageModalData = {
            title: this.translateService.instant('title.confirmUnblockAccMsg'),
            body: this.translateService.instant('body.confirmUnblockAccMsg'),
            size: 'md',
            action: '',
            accountAliasName: '',
            accountNumber: '',
            config: 'Unblock'
        }
        this.inquiryRequestToPayBlockList();
       
    }

    private unBlockAccount(account: any){
        this.messageModalData.accountAliasName = account.accountAliasName;
        this.messageModalData.accountNumber = account.anyIDValue

        this.selectedUnBlockAccount = account;
        this.messageModal.show();

    }

    private onEmit($event){
        this.messageModal.hide();
        if($event === 'Unblock'){
            let deleteRequestToPayData = {
                type: this.selectedUnBlockAccount.anyIDType.anyIDType || this.selectedUnBlockAccount.anyIDType,
                name: this.selectedUnBlockAccount.accountAliasName,
                value: this.selectedUnBlockAccount.anyIDValue
            }
            this.requestToPayService.deleteRequestToPayAnyIdBlocklist(deleteRequestToPayData).then((result: any) => {
                if(result.errorMessage === undefined){
                    this.inquiryRequestToPayBlockList();
                    this.alertConfig.type = 'success'
                    this.alertConfig.message = this.translateService.instant('unblock.successMsg');
                    this.alertMessage.show();
                } else {
                    this.onError(result);
                }
            });
        }

    }

    inquiryRequestToPayBlockList(){
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
                let anyIDTypes = result;
                for(let i in anyIDTypes){
                    if (anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_BANK_ACCOUNT) {
                        delete anyIDTypes[i];
                    }
                }
                this.requestToPayService.inquiryRequestToPayAnyIdBlocklist(anyIDTypes).then((result: any) => {
                
                if(result.errorMessage == undefined){
                    this.accountLists = result;
                }else {
                    this.isHidden = true;
                    this.onError(result);
                }

            });
        });
       
    }

    protected onError(responseData: any) {
        this.alertConfig.message = responseData.errorMessage;
        this.alertConfig.type = 'danger';
        this.alertMessage.show();
    }

}

