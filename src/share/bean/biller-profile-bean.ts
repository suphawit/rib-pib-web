import { BillerRefNoBean } from './biller-ref-no-bean';

export class BillerProfileBean {

    constructor() {
        this.refNoList = new Array<BillerRefNoBean>();
    }
    billerId:string;
    billerProfileId:string;
    promptPayBillerId: string;
    profileCode:string;
    aliasName: string;
    categoryId:string;
    categoryTh: string;
    categoryEn:string;
    companyCode: string;
    companyTh: string;
    companyEn: string;
    logoCompany: string;
    subServiceTh: string;
    subServiceEn: string;
    isFavourite:string;
    refNoList : Array<BillerRefNoBean>;
    billerNameEn: string;
    billerNameTh: string;
    serviceCode: string;
// ..Status ??
// ..Start Date ??
// ..End Date ??

    public getBillerNameTh() : string {
        return this.billerNameTh;
    }

    public getBillerNameEn() : string {
        return this.billerNameEn;
    }
}