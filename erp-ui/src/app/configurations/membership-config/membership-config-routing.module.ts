import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipConfigComponent } from './membership-config.component';
import { MembershipSettingsComponent } from './membership-settings/membership-settings.component';
import { MembershipAddSettingsComponent } from './membership-settings/membership-add-settings/membership-add-settings.component';
import { MembershipGroupTypesComponent } from './membership-group-types/membership-group-types.component';
import { MembershiAddGroupTypesComponent } from './membership-group-types/membershi-add-group-types/membershi-add-group-types.component';
import { MembershipSoilTypesComponent } from './membership-soil-types/membership-soil-types.component';
import { MembershiAddSoilTypesComponent } from './membership-soil-types/membershi-add-soil-types/membershi-add-soil-types.component';
import { MembershipAssetTypesComponent } from './membership-asset-types/membership-asset-types.component';
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
import { MembershipAddWorkFlowComponent } from './membership-work-flow/membership-add-work-flow/membership-add-work-flow.component';
import { MembershipIrrigationTypesComponent } from './membership-irrigation-types/membership-irrigation-types.component';
import { MembershipAddIrrigationTypesComponent } from './membership-irrigation-types/membership-add-irrigation-types/membership-add-irrigation-types.component';
import { MembershipFeeTypesComponent } from './membership-fee-types/membership-fee-types.component';
import { MembershipAddFeeTypesComponent } from './membership-fee-types/membership-add-fee-types/membership-add-fee-types.component';
import { MembershipAddAssetTypesComponent } from './membership-asset-types/membership-add-asset-types/membership-add-asset-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { VoterConfigComponent } from './voter-config/voter-config.component';
import { AddVoterConfigComponent } from './voter-config/add-voter-config/add-voter-config.component';
const routes: Routes = [
  {
      path: '', component: MembershipConfigComponent,
      children: [
        { path: 'settings', component: MembershipSettingsComponent},
        { path: 'add_setting', component: MembershipAddSettingsComponent},
        { path: 'group_types', component: MembershipGroupTypesComponent},
        { path: 'add_group_type', component: MembershiAddGroupTypesComponent},
        { path: 'soil_types', component: MembershipSoilTypesComponent},
        { path: 'add_soil_type', component: MembershiAddSoilTypesComponent},
        { path: 'asset_types', component: MembershipAssetTypesComponent},
        { path: 'add_asset_type', component: MembershipAddAssetTypesComponent},
        { path: 'incorporation_types', component: MembershipIncorporationTypesComponent},
        { path: 'add_incorporation_type', component: MembershipAddIncorporationTypesComponent},
        { path: 'season_types', component: MembershipSeasonTypesComponent},
        { path: 'add_season_type', component: MembershipAddSeasonTypesComponent},
        { path: 'mcr_details', component: MembershipMcrDetailsComponent},
        { path: 'add_mcr_details', component: MembershipAddMcrDetailsComponent},
        { path: 'uom', component: MembershipUomComponent},
        { path: 'add_uom', component: MembershipAddUomComponent},
        { path: 'uom_calculations', component: MembershipUomCalculationsComponent},
        { path: 'add_uom_calculation', component: MembershipAddUomCalculationsComponent},
        { path: 'water_source_types', component: MembershipWaterSourceTypesComponent},
        { path: 'add_water_source_type', component: MembershipAddWaterSourceTypesComponent},
        { path: 'common_category', component: MembershipCommonCategoryComponent},
        { path: 'add_common_category', component: MembershipAddCommonCategoryComponent},
        { path: 'workflow', component: MembershipWorkFlowComponent},
        { path: 'add_workflow', component: MembershipAddWorkFlowComponent},
        { path: 'irrigation_types', component: MembershipIrrigationTypesComponent},
        { path: 'add_irrigation_type', component: MembershipAddIrrigationTypesComponent},
        { path: 'fee_types', component: MembershipFeeTypesComponent},
        { path: 'add_fee_type', component: MembershipAddFeeTypesComponent},
        { path: 'document_types', component: DocumentTypesComponent},
        { path: 'add_document_type', component: AddDocumentTypesComponent},
        { path: 'voter_config', component:VoterConfigComponent },
      { path: 'add_voter_config', component:AddVoterConfigComponent },
      ]
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipConfigRoutingModule { }
