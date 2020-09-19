import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { UtilService } from '../../../../share/service/util.service';
import { KKProductAndServicePage } from '../../kk-product-and-service-page';

@Component({
    selector: 'pib-web-kk-product-service',
    templateUrl: '../../kk-product-and-service-page.html'
})
export class PIBWebKKProductAndServicePage extends KKProductAndServicePage implements OnInit {
    constructor(public constants: Constants,
        private utilService: UtilService) {
        super(constants);
    }

    ngOnInit(): void {
        this.alertConfig = {
            title: '',
            type: 'danger',
            message: '',
            show: false,
            option: {}
        };

        this.product = {
            data: [],
            title: 'history',
            subtitle: 'newProduct'
        };

        this.autoScaleHeight();
    }

    private autoScaleHeight(): void {
        if (window != window.top) {
            let root = this;

            setTimeout(function () {
                root.utilService.pageLoad();
            }, 500);
        }
    }
}