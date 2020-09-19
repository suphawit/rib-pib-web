import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'activate-account-subscribe-info',
    templateUrl: 'activate-account-subscribe-info.html'
})
export class ActivateAccountSubscribeInfoComponent implements OnInit {
    @Input('data') infoData: any;

    subscribeInfoData: any;

    ngOnInit(){
        this.subscribeInfoData = this.infoData || {};
    }

}