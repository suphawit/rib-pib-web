import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { MfpApi } from '../mfp/mfp-api.service';
import { Constants } from './constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { PermissionService } from "./permission.service"
import { IsLoginService } from './islogin.service';


@Injectable()
export class NotificationService {
    private badgeMenuList = [];
    private badgeMenuListStream = new BehaviorSubject<any[]>([]);

    private notificationTmpList = [];

    private currentBadge = 0;
    private badgeString = "0";
    private scheduleNotiTmp = null;
    //private isFirstNotification = false;
    // private mockBadgeMenuList = [
    //     {badge: 30, menuCode: 'MY_RTP'},
    //     {badge: 10, menuCode: 'RTP_RECEIVE'},
    // ]
    @Output() notificationEvent: EventEmitter<any> = new EventEmitter(true);
    @Output() notificationHistoryEvent: EventEmitter<any> = new EventEmitter(true);
    @Output() badgeUpdateEvent: EventEmitter<any> = new EventEmitter(true);

    constructor(private mfpApi: MfpApi, private constants: Constants, private translate: TranslateService,
        private permissionService: PermissionService, private isLoginService: IsLoginService) {
        this.permissionService.logoutEvent.subscribe(event => this.logoutTrigger(event));
        this.permissionService.PermssionChangeEvent.subscribe(event => this.loginTrigger(event));
    };

    public getBadgeMenuListStream() {
        return this.badgeMenuListStream;
    }
    public getBadgeMenuList(): any[] {
        return this.badgeMenuList;
    }

    public setBadgeMenuList(badgeMenuList) {
        this.badgeMenuList = badgeMenuList;
    }

    public setBadgeMenuCount(menuCode: string, badge: number) {
        this.badgeMenuList.forEach((item) => {
            if (item.menuCode === menuCode) {
                item.badge = badge;
                return;
            }
        })
    }

    public getBadgeMenuCount(menuCode: string) {
        let count = 0;
        this.badgeMenuList.forEach((item) => {
            if (item.menuCode === menuCode) {
                count = item.badge;
                return;
            }
        });
        return count;
    }



    public clearBeforeLongPolling() {

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'act_notification_logoff',
                params: {},
                procedure: "logOffNotification"
            }
            this.mfpApi.invokeNotiProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise
    }


    public getInfo(params) {

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'ACT_GET_NOTIFICATION_DETAIL',
                params: {
                    'txnId': params.dataType.txnId,
                    'notificationType': params.actionType
                },
                procedure: "getNotificationDetailProcedure"
            }

            obj.params.notificationType = params.actionType;

            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise
    }

    public getInfoByUser(params) {

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'get_notification_detail',
                params: {Data :{ 'notificationId': params.notificationId}},
                procedure: "getNotificationDetail"
            }

            this.mfpApi.invokeNotiProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise
    }

     public getRTPIncomingInfo(params){

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'ACT_RTP_INQUIRY_INCOMING_BY_RTP_REF',
                params: {
                            'rtpRef': params.dataType.txnId,
                            'language': this.translate.currentLang
                        },
                procedure: "inquiryRTPIncomingByRtpRefProcedure"
            }

            this.mfpApi.invokeProcedure(obj).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);

            });
        });

        return promise
    }


    private logoutTrigger(e){

        // if(!this.isLoginService.getIsLongPollingKick()){
        //     alert("call log off")

        //     var promise = new Promise((resolve, reject) => {
        //         let obj = {
        //             actionCode: 'act_notification_logoff',
        //             params: {},
        //             procedure: "logOffNotification"
        //         }
        //         this.mfpApi.invokeNotiProcedure(obj).then((result) => {
        //
        //         }, function (error) {
        //
        //             // reject(error);
        //         });
        //     });

        // }else{

        //     alert("can't call")
        // }

        this.isLoginService.setIsLongPollingKick(false);
        this.notificationTmpList = [];
        this.currentBadge = 0;
        this.badgeString = "0";
        this.badgeUpdateEvent.emit(this.badgeString);
        //    return promise;
    }


    public setScheduleData(data){
        this.scheduleNotiTmp = data;
    }

    public getScheduleData(isClear){
        let dataTmp = this.scheduleNotiTmp;
            if(isClear){
                this.scheduleNotiTmp = null;
            }
        return dataTmp;
    }

    private loginTrigger(e) {

    }
    public getBadgeMenuCountStr(menuCode: string) {
        let badgelist = this.getBadgeMenuList();
        if (!badgelist) {
            return '';
        }
        if (menuCode === 'RTP') {
            let sum = 0;
            for (let index = 0; index < badgelist.length; index++) {
                let item = badgelist[index];
                sum += item.badge;
            }
            if (sum == 0) {
                return '';
            }
            return sum > 99 ? '99+' : sum;
        }
        let count = this.getBadgeMenuCount(menuCode);
        if (count == 0) {
            return '';
        }
        return count > 99 ? '99+' : count;
    }

    public badgeMenuCountProcedure(): Promise<any> {
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: this.constants.REQ_ACTION_CODE.BADGE_MENU_COUNT,
                params: {},
                procedure: this.constants.REQ_PROCEDURE_NAME.BADGE_MENU_COUNT
            }
             let invokeOption = {isHideLoader:true};
            this.mfpApi.invokeProcedure(obj, invokeOption).then((result) => {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    }


    public longPolling() {

        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'act_polling_notification',
                params: {},
                procedure: "getNotification"
            }
            let isCallPolling: boolean = true;

            this.mfpApi.invokeNotiProcedure(obj).then((result) => {
                let statusCode = result.responseJSON.result.statusCode;

                if (this.permissionService.getIsLogin() && this.permissionService.preparedLogout) {
                    //status 200 is new notification comming
                    if (statusCode === 200) {
                        let recievenotificationlist = result.responseJSON.result.value;

                        if (recievenotificationlist[0].actionType === "logoff_notification") {
                            isCallPolling = false;
                            this.isLoginService.setIsLongPollingKick(true);
                            this.isLoginService.setMultipleLoginEmitter(true);
                        } else {
                            this.badgeCal("add", recievenotificationlist.length);
                            this.emitterValue(recievenotificationlist, false);
                        }

                    }
                    //alert(isCallPolling);
                    //prevent infinity loop                                                                                                                                                     
                    if ((statusCode === 200 || statusCode === 204) && isCallPolling) {
                        this.longPolling();
                    } else {

                    }

                    resolve(result);
                }
            }, function (error) {

                // reject(error);
            });
        });
        return promise
    }

    public getAllNotification(currentPage) {

        let isHistory = true;
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'get_all_notification_by_user',
                params: {
                    "paging": {
                        "currentPage": currentPage,
                        "pageSize": 10
                    }
                },
                procedure: "getAllNotification"
            }
            this.mfpApi.invokeNotiProcedure(obj).then((result) => {

                if (result.responseJSON.result.statusCode === 200) {
                    let recievenotificationlist = result.responseJSON.result.value.data;
                    let badge = result.responseJSON.result.value.badge;
                    if (currentPage === 0) {
                        this.longPolling();
                        this.notificationTmpList = [];

                        this.currentBadge = 0;
                        this.badgeString = "0";
                        // this.isFirstNotification = true;
                        this.badgeCal("add", badge);
                        //   isHistory = false;


                    }

                    this.emitterValue(recievenotificationlist, isHistory);
                }
               
                resolve(result.responseJSON.result.value.data.length);

            }, function (error) {

                reject(0);
            });
        });
        return promise;
    }


    private emitterValue(recievenotificationlist, isHistory) {

        recievenotificationlist.forEach((item, value) => {
            if (this.notificationTmpList[item.notificationId] == undefined) {
                item["icons"] = this.getNotificationIcons(item.typeIcon);
                item["iconName"] = this.mapNotificationIcons(item.actionType);
                this.notificationTmpList[item.notificationId] = item;

                if (isHistory) {

                    this.notificationHistoryEvent.emit(item)
                } else {

                    this.notificationEvent.emit(item)
                }


                this.badgeUpdateEvent.emit(this.badgeString);
            }
        })
    }



    public triggerNotification(notificationId) {
        //let that = this;
        var promise = new Promise((resolve, reject) => {
            let obj = {
                actionCode: 'act_read_action_trigger',
                params: {
                    "notificationId": notificationId
                },
                procedure: "triggerNotification"
            }
            this.mfpApi.invokeNotiProcedure(obj).then((result) => {


                this.badgeCal("del", 1);
                this.badgeUpdateEvent.emit(this.badgeString);
                resolve(result);

            }, function (error) {

                reject(error);
            });
        });
        return promise

    }

    /**
     * @params type
     * For set notification icons
     * 
     */
    private getNotificationIcons(type_icon) {

        let iconsList = {
            "upcoming": {
                'bg': "label label-sm label-icon label-info",
                'icons': "fa fa-calendar-o"
            },
            "fail": {
                'bg': "label label-sm label-icon label-danger",
                'icons': "fa fa-close"
            },
            "success": {
                'bg': "label label-sm label-icon label-success",
                'icons': "fa fa-check"
            },
            "notice": {
                'bg': "label label-sm label-icon label-warning",
                'icons': "fa fa-bullhorn"
            },
            "default": {
                'bg': "label label-sm label-icon label-success",
                'icons': "fa fa-check"
            }
        }

        if (iconsList[type_icon] === undefined) {
            return iconsList["default"];

        }

        return iconsList[type_icon];
    }

    private mapNotificationIcons(actionType) {

        let iconName = {
            "notification_info": {
                'icons': "icon-menu-book-open"
            },
            "transfer_result": {
                'icons': "icon-menu-fund-transfer"
            },
            "payment_result": {
                'icons': "icon-menu-bill-payment"
            },
            "transfer_schedule": {
                'icons': "icon-menu-manage-schedule"
            },
            "payment_schedule": {
                'icons': "icon-menu-manage-schedule"
            },
            "rtp_incoming": {
                'icons': "icon-menu-request-to-pay"
            },
             "notification_detail_by_user": {
                'icons': "icon-menu-book-open"
            },
             "default": {
                'icons': "fa fa-check"
            }
        }

        if (iconName[actionType] === undefined) {
            return iconName["default"];

        }

        return iconName[actionType];
    }


    private badgeCal(type, badgeNum) {

        if (type === "add") {
            this.currentBadge += badgeNum;
            this.badgeString = this.currentBadge.toString();
            // if (this.currentBadge > 99) {
            //     this.badgeString = "99+"
            // }
        } else {
            this.currentBadge -= badgeNum;
            this.badgeString = this.currentBadge.toString();
            if (this.currentBadge < 0) {
                this.currentBadge = 0;
                this.badgeString = "0";
            }
        }


        // this.currentBadge = 20;
    }


    public getNotifyDetail(actionCode, procedure) {


        var p = new Promise((resolve, reject) => {
            let objRequest = {
                actionCode: "ACT_RBAC_GET_INFORMATION_SERVICE",
                params: {
                    actionCode: "contact_us"
                },
                procedure: 'getPrivacyWithLoginProcedure'
            };

            //this.mfpApi.invokeProcedure(objRequest).then((objResponse) => {
            this.mfpApi.invokeProcedure(objRequest,{adapter:'utilityAdapter',isHideLoader:false}).then((objResponse) => {
                resolve(objResponse);
            }, function (error) {
                reject(error);

            });
        });

        return p;
    }

    public updateBadgeMenuCount() {
        this.badgeMenuCountProcedure().then((result) => {
            let badgeResult = result.responseJSON.result;
            const value = badgeResult.value;
            if (badgeResult.responseStatus.responseCode === this.constants.RESP_CODE_SUCCESS) {
                this.setBadgeMenuList(value);
                this.badgeMenuListStream.next(value);
            }
        })
    }

}

