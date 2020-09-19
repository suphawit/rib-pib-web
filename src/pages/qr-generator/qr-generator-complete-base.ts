import { OnDestroy, AfterViewInit} from '@angular/core';
import { RequestToPayService } from '../request-to-pay/request-to-pay.service';
import { Constants } from '../../share/service/constants';
import { TranslateService } from "ng2-translate/src/translate.service";
import { MasterDataService } from '../../share/service/master-data.service';
import { qrGeneratorService } from './qr-generator.service';
import { CurrencyFormatterPipe } from '../../share/pipe/currency-formatter.pipe';
import { PermissionChangeRoute } from '../../share/service/permission.service';
import { UtilService } from '../../share/service/util.service';
require("script-loader!assets/lib/base64-binary.js");
require("script-loader!assets/lib/FileSaver.min.js");
declare var Base64Binary;
declare var saveAs;
declare var BUILD_NUM;

export class QRGeneratorCompleteBase implements OnDestroy,AfterViewInit{
   
    private qrCodeData: any = {};
    private finishDrawCanvas: boolean = false;
    constructor(
    protected requestToPayService: RequestToPayService,
    protected translate: TranslateService,
    protected constants: Constants,
    protected masterDataService: MasterDataService,
    protected qrGeneratorService: qrGeneratorService,
    protected currencyFormatter: CurrencyFormatterPipe,
    protected permissionChangeRoute: PermissionChangeRoute,
    protected utilService: UtilService
    ) {
    
    }

    initial(){
        this.qrCodeData =  this.qrGeneratorService.getQRCodeData();
        this.qrCodeData.QRGeneratorFormGroup.amount =  (parseFloat(this.qrCodeData.QRGeneratorFormGroup.amount) == 0 || isNaN(parseFloat(this.qrCodeData.QRGeneratorFormGroup.amount)) )
            ? null : this.currencyFormatter.transform(parseFloat(this.qrCodeData.QRGeneratorFormGroup.amount).toString());
    }

    save(){
        if(this.finishDrawCanvas){
            let canvas = <HTMLCanvasElement> document.getElementById("QRFramecanvas");
            this.convertFile( canvas.toDataURL().split(',')[1],'kkp-QR-Code.png');
        }else{
            this.save();
        }
    }

   navigateback(){
       this.permissionChangeRoute.prevUrl = 'QR_GENERATOR';
       this.permissionChangeRoute.changeRoute('QR_GENERATOR');
   }

   ngOnDestroy(){
       if(this.permissionChangeRoute.prevUrl != 'QR_GENERATOR'){
        this.qrGeneratorService.setQRCodeData(undefined);
       }
        this.permissionChangeRoute.prevUrl = undefined;
   }

   convertFile(data,fileName) {
       let browserName = this.utilService.getBrowserVersion().name.toUpperCase();
       if(browserName == 'SAFARI'){
            var pngData = 'data:application/png;base64,' + data;
            this.utilService.openTab(pngData);
       }else if (data) {
            let byteArray = Base64Binary.decodeArrayBuffer(data);
            
            let file = new Blob([byteArray], {
                type: 'application/png'
            });
            saveAs(file, fileName);
        }
   }

   ngAfterViewInit(){
        var canvas = <HTMLCanvasElement> document.getElementById("QRFramecanvas");
        canvas.style.display="none";
        
        let _qrCodeData = this.qrCodeData;
        let _translate = this.translate;
       
        var ctx = canvas.getContext("2d");
        canvas.width = 1200;
        canvas.height = 1800;


        var renderImg = [
            {path:"./assets/images/template_QR_web.png?v="+BUILD_NUM,x:0,y:0,width:1200,height:1800},
            {path:document.getElementsByTagName('qr-code')[0].getElementsByTagName('img')[0].src,x: canvas.width / 2 - 750 / 2,y: canvas.height / 2 - ( 750 / 2) + 20,width:750,height:750},
            {path:"./assets/images/Thai_QR_Payment_Logo_tranparent.png?V="+BUILD_NUM,x:canvas.width / 2 - 120 / 2,y:canvas.height / 2 - ( 100 / 2) + 20,width:120,height:100}
        ];
        var renderTxt = [
            {text:_qrCodeData.accountName,lineWidth: 4,font:'70px RSU_BOLD',x:canvas.width / 2,y:(canvas.height/2)+ (750/2)},
            {text:_qrCodeData.QRGeneratorFormGroup.amount,lineWidth: 4,font:'70px RSU_BOLD',x: canvas.width / 2,y: (canvas.height/2)+ (750/2) + 200},
            {text:_translate.instant('lbl.bahtTHEN'),lineWidth: 2,font:'50px RSU_BOLD',x: canvas.width / 2,y:(canvas.height/2)+ (750/2) + 250}
        ];

        var LoadedImgs=[];
        var count=0;
        startLoadingAllImages(imagesAreNowLoaded);

        function startLoadingAllImages(callback){

            for (var i=0; i<renderImg.length; i++) {
                var img = new Image();
                LoadedImgs.push(img);
                img.onload = function(){ 
                    count++; 
                    if (count>=renderImg.length ) {
                    callback();
                    }
                };
                img.onerror=function(){}
                img.src = renderImg[i].path;
            }      
        }

        function imagesAreNowLoaded(){
            for(var i = 0; i< renderImg.length; i++){
                ctx.drawImage(LoadedImgs[i],renderImg[i].x,renderImg[i].y,renderImg[i].width,renderImg[i].height);
            }

            var renderTxtLength = (_qrCodeData.isDisableAmount)? 1:renderTxt.length;
            var heightAccountNameTxt = (_qrCodeData.isDisableAmount)? 180:100
            for(var i = 0; i< renderTxtLength; i++){
                ctx.lineWidth=renderTxt[i].lineWidth;
                ctx.fillStyle="#000000";
                ctx.font=renderTxt[i].font;
                ctx.textAlign = "center";

                renderTxt[0].y = renderTxt[0].y + heightAccountNameTxt;
                ctx.fillText(renderTxt[i].text,renderTxt[i].x,renderTxt[i].y);
            }
        }
        this.finishDrawCanvas = true;
   }
}
