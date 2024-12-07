import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MembershipConfigRoutingModule } from './membership-config-routing.module';
import { MembershipConfigComponent } from './membership-config.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershipSettingsComponent } from './membership-settings/membership-settings.component';
import { MembershipAddSettingsComponent } from './membership-settings/membership-add-settings/membership-add-settings.component';
import { MembershipGroupTypesComponent } from './membership-group-types/membership-group-types.component';
import { MembershipSoilTypesComponent } from './membership-soil-types/membership-soil-types.component';
import { MembershipAssetTypesComponent } from './membership-asset-types/membership-asset-types.component';
import { MembershiAddGroupTypesComponent } from './membership-group-types/membershi-add-group-types/membershi-add-group-types.component';
import { MembershiAddSoilTypesComponent } from './membership-soil-types/membershi-add-soil-types/membershi-add-soil-types.component';
import { MembershipIncorporationTypesComponent } from './membership-incorporation-types/membership-incorporation-types.component';
import { MembershipAddIncorporationTypesComponent } from './membership-incorporation-types/membership-add-incorporation-types/membership-add-incorporation-types.component';
import { MembershipSeasonTypesComponent } from './membership-season-types/membership-season-types.component';
import { MembershipAddSeasonTypesComponent } from './membership-season-types/membership-add-season-types/membership-add-season-types.component';
import { MembershipMcrDetailsComponent } from './membership-mcr-details/membership-mcr-details.component';
import { MembershipAddMcrDetailsComponent } from './membership-mcr-details/membership-add-mcr-details/membership-add-mcr-details.component';
import { MembershipUomComponent } from './membership-uom/membership-uom.component';
import { MembershipAddUomComponent } from './membership-uom/membership-add-uom/membership-add-uom.component';
import { MembershipUomCalculationsComponent } from './membership-uom-calculations/membership-uom-calculations.component';
import { MembershipAddUomCalculationsComponent } from './membership-uom-calculations/membership-add-uom-calculations/membership-add-uom-calculations.component';
import { MembershipWaterSourceTypesComponent } from './membership-water-source-types/membership-water-source-types.component';
import { MembershipAddWaterSourceTypesComponent } from './membership-water-source-types/membership-add-water-source-types/membership-add-water-source-types.component';
import { MembershipCommonCategoryComponent } from './membership-common-category/membership-common-category.component';
import { MembershipAddCommonCategoryComponent } from './membership-common-category/membership-add-common-category/membership-add-common-category.component';
import { MembershipWorkFlowComponent } from './membership-work-flow/membership-work-flow.component';
import { MembershipIrrigationTypesComponent } from './membership-irrigation-types/membership-irrigation-types.component';
import { MembershipFeeTypesComponent } from './membership-fee-types/membership-fee-types.component';
import { MembershipAddWorkFlowComponent } from './membership-work-flow/membership-add-work-flow/membership-add-work-flow.component';
import { MembershipAddIrrigationTypesComponent } from './membership-irrigation-types/membership-add-irrigation-types/membership-add-irrigation-types.component';
import { MembershipAddFeeTypesComponent } from './membership-fee-types/membership-add-fee-types/membership-add-fee-types.component';

// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { AssetTypesService } from './membership-asset-types/shared/asset-types.service';
import { FeeTypeService } from './membership-fee-types/shared/fee-type.service';
import { GroupTypesService } from './membership-group-types/shared/group-types.service';
import { IncorporationTypesService } from './membership-incorporation-types/shared/incorporation-types.service';
import { McrDetailsService } from './membership-mcr-details/shared/mcr-details.service';
import { SeasonTypesService } from './membership-season-types/shared/season-types.service';
import { SettingsService } from './membership-settings/shared/settings.service';
import { SoilTypesService } from './membership-soil-types/shared/soil-types.service';
import { UomService } from './membership-uom/shared/uom.service';
import { UomCalculationsService } from './membership-uom-calculations/shared/uom-calculations.service';
import { IrrigationTypeService } from './membership-irrigation-types/shared/irrigation-type.service';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { MembershipAddAssetTypesComponent } from './membership-asset-types/membership-add-asset-types/membership-add-asset-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { VoterConfigComponent } from './voter-config/voter-config.component';
import { AddVoterConfigComponent } from './voter-config/add-voter-config/add-voter-config.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MembershipConfigComponent,
    MembershipSettingsComponent,
    MembershipAddSettingsComponent,
    MembershipGroupTypesComponent,
    MembershipSoilTypesComponent,
    MembershipAssetTypesComponent,
    MembershipAddAssetTypesComponent,
    MembershiAddGroupTypesComponent,
    MembershiAddSoilTypesComponent,
    MembershipIncorporationTypesComponent,
    MembershipAddIncorporationTypesComponent,
    MembershipSeasonTypesComponent,
    MembershipAddSeasonTypesComponent,
    MembershipMcrDetailsComponent,
    MembershipAddMcrDetailsComponent,
    MembershipUomComponent,
    MembershipAddUomComponent,
    MembershipUomCalculationsComponent,
    MembershipAddUomCalculationsComponent,
    MembershipWaterSourceTypesComponent,
    MembershipAddWaterSourceTypesComponent,
    MembershipCommonCategoryComponent,
    MembershipAddCommonCategoryComponent,
    MembershipWorkFlowComponent,
    MembershipIrrigationTypesComponent,
    MembershipFeeTypesComponent,
    MembershipAddWorkFlowComponent,
    MembershipAddIrrigationTypesComponent,
    MembershipAddFeeTypesComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent,
    VoterConfigComponent,
    AddVoterConfigComponent
    
  ],
  imports: [
    CommonModule,
    MembershipConfigRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
   TranslateModule,
  ],
  providers: [
    AssetTypesService,
    FeeTypeService,
    GroupTypesService,
    IncorporationTypesService,
    IrrigationTypeService,
    McrDetailsService,
    SeasonTypesService,
    SettingsService,
    SoilTypesService,
    UomService,
    UomCalculationsService,
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class MembershipConfigModule { }
