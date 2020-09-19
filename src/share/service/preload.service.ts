import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

export interface ILoader {
    isLoading: boolean;
}

@Injectable()
export class PreloadService {
    utilService: UtilService;
    loader: ILoader = { isLoading: false };

    constructor(
        utilService: UtilService
    ) {

        this.utilService = utilService;
    }

    showLoader() {

        this.loader.isLoading = true;
    }

    hideLoader() {

        this.loader.isLoading = false;

        if (window != window.top) {
            let root = this;
            // for (let i = 1; i <= 2; i++) {
            //     setTimeout(function () {
            //         root.utilService.pageLoad(20);
            //     }, 1000 * i);
            // }

            setTimeout(function () {
                root.utilService.pageLoad(20);
            }, 1000);
        }
    }
} 
