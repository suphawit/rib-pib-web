import { NgModule, ModuleWithProviders } from '@angular/core';
import { AccountService } from "./account.service";
import { AuthGuard } from "./AuthGuard";
import { BankCodeDataService } from "./bankcode-data.service";
import { CanvasService } from "./canvas.service";
import { Constants } from "./constants";
import { Dateservice } from "./date.service";
import { DropdownDataService } from "./dropdown.service";
import { FundTransferService } from "./fund-transfer.service";
import { GetinformationService } from "./getInformation.service";
import { IsLoginService } from "./islogin.service";
import { MasterDataService } from "./master-data.service";
import { MutualFundService } from "./mutual-fund.service";
import { PreloadService } from "./preload.service";
import { UtilService } from "./util.service";
import { PermissionAction, PermissionMainMenu, PermissionService, PermissionChangeRoute } from "./permission.service";
import { ReportService } from "./report.service";
import { MainMenuRibWebService } from "./main-menu.service";
@NgModule({
	declarations: [
	],
	imports: [
	],
	providers: [
	],
	exports: [
	]
})
export class ServiceRIBWebModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ServiceRIBWebModule,
			providers: [
                AccountService,
                AuthGuard,
                BankCodeDataService,
                CanvasService,
                Constants,
                Dateservice,
                FundTransferService,
                IsLoginService,
                MasterDataService,
                UtilService,
                PermissionAction,
                PermissionMainMenu,
                PermissionService,
                PermissionChangeRoute,
                DropdownDataService,
                GetinformationService,
                PreloadService,
                ReportService,
                MainMenuRibWebService,
                MutualFundService
			],
		}
	}
}
