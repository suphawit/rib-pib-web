import { TranslateService } from 'ng2-translate';
import { Constants } from '../../service/constants';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PermissionChangeRoute, PermissionService } from '../../service/permission.service';
import { Subscription } from "rxjs";

require("!style-loader!css-loader!sass-loader!./breadcrumb.scss");

@Component({
    selector: 'breadcrumbs',
    templateUrl: "./breadcrumb.html"
})

export class BreadcrumbComponent implements OnInit, OnDestroy {
    private curlang: string;
    private langSubscription: Subscription;
    
    @Input() data: any;
    @Input() style: string;
    @Input() selected: string;

    constructor(public constants: Constants,
        private permissionChangeRoute: PermissionChangeRoute,
        private permissionService: PermissionService,
        private translate: TranslateService) {
    }

    ngOnInit(): void {
        this.curlang = this.translate.currentLang;


        this.langSubscription = this.translate.onLangChange
        .subscribe(() => {
            this.curlang = this.translate.currentLang;
        });
    }

    ngOnDestroy(): void {
        this.langSubscription.unsubscribe();
    }

    goToPage(menuCode: string): void {
        if ((this.constants.FIRST_PAGE_CODE_AF_LGN_PIB_W === menuCode || this.constants.FIRST_PAGE_CODE_BF_LGN_PIB_W === menuCode) && this.permissionService.getIsTermAndCon()) {
            this.permissionChangeRoute.changeRoute(menuCode);
        }
        if(menuCode !== null){
            this.permissionChangeRoute.changeRoute(menuCode);
        }
        

    }
}

export interface Breadcrumb {
    input: InputComponent;
}

interface InputComponent {
    data: any;
    style: string;
    selected: string;
} 
