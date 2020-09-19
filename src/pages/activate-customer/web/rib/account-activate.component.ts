import { ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountActivateService } from './account-activate.service'
import { OtpService } from '../../../../share/component/verify-otp/otp.service';
import { AlertMessageComponent } from '../../../../share/component/alert-message/alert-message.component';
import { Subscription } from "rxjs";

@Component({
	selector: 'pages-rib-web-account-activate',
	templateUrl: 'account-activate.html'
})

export class AccountActivateComponent implements OnInit, OnDestroy {
	observer: any;
	observerSubscription: Subscription;
	public currentStepWizard: Number;
	alertConfig: { type: string, message: string, show: boolean };

	@ViewChild('alertMessage') public alertMessage: AlertMessageComponent;

	constructor(private accountActivateService: AccountActivateService,
		private otpService: OtpService) {

	}

	ngOnInit(): void {
		// initialize observer
		this.observer = this.accountActivateService.getObserver();
		this.observerSubscription = this.observer.subscribe(result => this.handleObserver(result));
		this.alertConfig = {
			type: 'danger',
			message: '',
			show: false
		};


	}
	ngOnDestroy(): void {
		this.observerSubscription.unsubscribe();
	}
	handleObserver(dataList: Array<any>) {
		for (let data of dataList) {
			if (data.key === 'stepwizard') {
				this.currentStepWizard = data.value;
			} else if (data.key === 'alertmessage') {
				this.alertConfig.message = data.value;
				if (data.value === '') {
					this.alertMessage.hide();
				} else {
					this.alertMessage.show();
				}
			}
		}
	}
}
