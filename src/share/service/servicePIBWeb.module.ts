import { NgModule, ModuleWithProviders } from '@angular/core';
import { AccountService } from "./account.service";
import { AuthGuard, HalfAuthGuard } from "./AuthGuard";
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
import { MainMenuPibWebService } from "./main-menu.service";
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
export class ServicePIBWebModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ServicePIBWebModule,
			providers: [
                AccountService,
                AuthGuard,
                HalfAuthGuard,
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
                MainMenuPibWebService,
                DropdownDataService,
                GetinformationService,
                PreloadService,
                ReportService,
			],
		}
	}
}
