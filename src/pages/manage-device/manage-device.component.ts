import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Constants } from '../../share/service/constants';
import { MessageModalComponent } from '../../share/component/modal-messages.component';
import { PermissionService,PermissionChangeRoute} from '../../share/service/permission.service';
import { ManageDeviceService } from './share/manage-device.service';
import { AlertMessageComponent } from '../../share/component/alert-message/alert-message.component';
import { MasterDataService } from '../../share/service/master-data.service';
import { TranslateService } from "ng2-translate/src/translate.service";

@Component({
    selector: 'manage-device',
    templateUrl: 'manage-device.html'
})
export class ManageDeviceComponent implements OnInit {
    messageModalData: {title: string; body:string; size: string; config:any; action:any;};
    listOfDevices: any;
    private alertConfig: { title: string, type: string, message: string };
    title: string;
    selectDevice:any = {};
    mobileAnyIdType:any = {};
    isFinishLoaded:boolean = false;
    @ViewChild('alertMessage') public alertMessage: AlertMessageComponent;
    @ViewChild('messageModal') public messageModal:MessageModalComponent;

    constructor( 
        public fb: FormBuilder,
        public constants: Constants,
        public permissionService:PermissionService,
        public permissionChangeRoute: PermissionChangeRoute,
        public manageDeviceService: ManageDeviceService,
        public masterDataService: MasterDataService,
        public translateService: TranslateService){
    }

    ngOnInit():void {
        this.messageModalData = {
            title: 'lbl.msgDeleteDevice',
            body: 'lbl.bodyMsgremoveDevice', 
            size: 'md',
            config: { isShowCloseBtn: true, isShowDeleteBtn: true },
            action: {}
        };

        this.getMobileIcon();
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: ''
        };

        this.title = 'lbl.manageDevice';

        this.getAllDevice();
    }

    onSubmit(data): void {
        this.selectDevice = data;
        this.messageModal.show();
    }

    private setErrorMessage(msg: string){
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: msg
        };

        if(msg){
            this.alertMessage.show();
        } else {
            this.alertMessage.hide();
        }
    }

    public onModalHidden() {
        this.selectDevice = {};
    }

    public onEmit($event) {
        if ($event !== undefined && $event === 'delete') {
            this.messageModal.hide();
            const params = {
                deviceId: this.selectDevice.deviceId,
                custDeviceId: this.selectDevice.custDeviceId
            };
            this.manageDeviceService.requestRemoveDevice(params).then((result: any) => {
                if (result.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                    this.alertConfig.title = 'label.Success';
                    this.alertConfig.type = 'success';
                    this.alertConfig.message = this.translateService.instant('lbl.removeDeviceSuccess');
                    this.alertMessage.show();
                    this.getAllDevice();
                }
            }, (error)=> {
                this.setErrorMessage(error.responseStatus.errorMessage);
            });
            
        }
    }

    private getAllDevice(){
        this.manageDeviceService.inquiryAllDevice().then((result: any) => {
            this.listOfDevices = result;
        }, (error)=> {
            this.setErrorMessage(error.responseStatus.errorMessage);
        });
    }

    private getMobileIcon(){
        this.masterDataService.getAllAnyIDTypes().then((result: any) => {
            let anyIDTypes = result;
            for(let i in anyIDTypes){
                if (anyIDTypes[i].anyIDType === this.constants.ANYID_TYPE_MOBILE) {
                    this.mobileAnyIdType = anyIDTypes[i];
                    console.log('this.mobileAnyIdType->',this.mobileAnyIdType)
                }
            }
        });
    }
}