import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../share/service/constants';
import { KKProductAndServicePage } from '../../kk-product-and-service-page';

@Component({
    selector: 'kk-product-service',
    templateUrl: '../../kk-product-and-service-page.html'
})
export class RIBWebKKProductAndServicePage extends KKProductAndServicePage implements OnInit {

    constructor(public constants: Constants) {
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
    }
}