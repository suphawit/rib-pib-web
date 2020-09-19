import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Constants } from '../../share/service/constants';

require("script-loader!assets/lib/FileSaver.min.js");
require("script-loader!assets/lib/base64-binary.js");

declare var saveAs;
declare var Base64Binary;
declare var BUILD_NUM;
// declare var jQuery: any;

@Injectable()
export class UtilService {

    constructor(
        private constants: Constants,
    ) {
    }

    getBrowserVersion() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1]) };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
        return {
            name: M[0],
            version: M[1]
        };
    }

    getDeviceUUID() {
        return this.genGuid();
    }

    genGuid() {  
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    private s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    getCurrentKnownCulture(currentLang) {
        let lang = this.constants.KNOWN_CULTURE_ENLISH_US;

        if (currentLang.toUpperCase() == this.constants.CULTURE_SHORTNAME_THAI) {
            lang = this.constants.KNOWN_CULTURE_THAI;
        }

        return lang;
    }

    downloadStreamFile(data, fileName) {
        if (data) {
            let browserName = this.getBrowserVersion().name.toUpperCase();

            if (browserName == 'SAFARI') {
                var pdfData = 'data:application/pdf;base64,' + data;
                this.openTab(pdfData);
            } else {
                let byteArray = Base64Binary.decodeArrayBuffer(data);
                let file = new Blob([byteArray], {
                    type: 'application/pdf'
                });

                saveAs(file, fileName);
            }
        }
    }

    cloneObject(obj) {
        let returnObj = obj;
        if (obj) {
            returnObj = JSON.parse(JSON.stringify(obj));
        }
        return returnObj;
    }

    arrayObjectIndexOf(arr: any[], obj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === obj) {
                return i;
            }
        }

        return -1;
    }

    openTab(url): void {
        function eventFire(el, etype) {
            if (el.fireEvent) {
                (el.fireEvent('on' + etype));
            } else {
                let evObj = document.createEvent('Events');
                evObj.initEvent(etype, true, false);
                el.dispatchEvent(evObj);
            }
        }

        // Create link in memory
        let link = window.document.createElement("a");
        link.target = '_blank';
        link.href = url;
        eventFire(link, "click");
    }

    scrollToTop() {
        try {
            if (window != window.top) {
                let j = { "key": "scrollTop", "value": "" };

                // post our message to the parent
                window.parent.postMessage(
                    JSON.stringify(j)
                    // set target domain
                    , "*"
                );
            }else{
                window.scrollTo(0,0);
            }
        } catch (ex) {

        }
    }

    pageLoad(offsetHeight = null) {
        try {
            if (window != window.top) {
                let j = { "key": "offsetHeight", "value": this.getDocHeight(offsetHeight) };


                // post our message to the parent
                window.parent.postMessage(
                    // get height of the content
                    JSON.stringify(j)
                    // set target domain
                    , "*"
                );
            }
        } catch (ex) {

        }
    }

    setPageHeight(height) {
        try {
            if (window != window.top) {
                let j = { "key": "offsetHeight", "value": height };


                // post our message to the parent
                window.parent.postMessage(
                    // get height of the content
                    JSON.stringify(j)
                    // set target domain
                    , "*"
                );
            }
        } catch (ex) {

        }
    }

    resetInputState(form: NgForm, name: string) {
        let ctrl = form.controls[name];

        if (typeof ctrl !== 'undefined') {
            ctrl.markAsPristine();
            ctrl.markAsUntouched();
            // ctrl.setErrors(null);
        }
    }

    public getDocHeight(offsetHeight) {
        let D = document;

        let offset = offsetHeight == null ? 0 : offsetHeight;
        return Math.max(
            (Math.max(D.body.scrollHeight, D.documentElement.scrollHeight) + offset),
            (Math.max(D.body.offsetHeight, D.documentElement.offsetHeight) + offset),
            (Math.max(D.body.clientHeight, D.documentElement.clientHeight) + offset)
        );
    }

    public getBillerIcon(billerdata) {
        return this.constants.BILLER_ICON_URL + billerdata.billerProfileId + '.png?v='+BUILD_NUM;
    }

    public getDefaultBillerIcon(event){
        event.target.src = this.constants.DEFAULT_BILLER_ICON+'?v=' + BUILD_NUM;
    }

    public getDefaultBillerIconPath(){
        return this.constants.DEFAULT_BILLER_ICON+'?v=' + BUILD_NUM;
    }

    public getEDonateIcon(billerdata) {
        return this.constants.BILLER_ICON_URL + billerdata.billerProfileId + '.png?v='+BUILD_NUM;
    }

    public getDefaultEDonateIcon(event){
        event.target.src = this.constants.DEFAULT_E_DONATE_BILLER_ICON+'?v=' + BUILD_NUM;
    }

    public getDefaultEDonateIconPath(){
        return this.constants.DEFAULT_E_DONATE_BILLER_ICON+'?v=' + BUILD_NUM;
    }

    validSpecialChar(dataText:string){
        let specialChar = new RegExp('[-!$%^&*()_+|~=`{}[:;<>?,.@#\\]]','g');
        // prevent special character
        return specialChar.test(dataText)
    }

    validNewline(dataText:string){
        let newlineChar = new RegExp('\\n\\r|\\n|\\r','g');
        // prevent newline character
        return newlineChar.test(dataText);
    }
}