import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonConfigComponent } from './common-config.component';
import { StateComponent } from './state/state.component';
import { AddStateComponent } from './state/add-state/add-state.component';
import { DistrictComponent } from './district/district.component';
import { SubDistrictComponent } from './sub-district/sub-district.component';
import { BlockComponent } from './block/block.component';
import { AddBlockComponent } from './block/add-block/add-block.component';
import { DivisionComponent } from './division/division.component';
import { AddDivisionComponent } from './division/add-division/add-division.component';
import { OccupationTypesComponent } from './occupation-types/occupation-types.component';
import { AddOccupationTypesComponent } from './occupation-types/add-occupation-types/add-occupation-types.component';
import { QualificationComponent } from './qualification/qualification.component';
import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { TransactionModeComponent } from './transaction-mode/transaction-mode.component';
import { AddTransactionModeComponent } from './transaction-mode/add-transaction-mode/add-transaction-mode.component';
import { VillagesComponent } from './villages/villages.component';
import { AccountTypesComponent } from './account-types/account-types.component';
import { AddAccountTypesComponent } from './account-types/add-account-types/add-account-types.component';
import { CasteComponent } from './caste/caste.component';
import { AddCasteComponent } from './caste/add-caste/add-caste.component';
import { AddSubDistrictComponent } from './sub-district/add-sub-district/add-sub-district.component';
import { AddVillagesComponent } from './villages/add-villages/add-villages.component';

import { CommunityComponent } from './community/community.component';
import { AddCommunityComponent } from './community/add-community/add-community.component';
import { RelationshipTypeComponent } from './relationship-type/relationship-type.component';
import { AddRelationshiTypeComponent } from './relationship-type/add-relationshi-type/add-relationshi-type.component';

import { AddDistrictComponent } from './district/add-district/add-district.component';
import { AddInterestPostingFrequencyComponent } from './interest-posting-frequency/add-interest-posting-frequency/add-interest-posting-frequency.component';
import { InterestPostingFrequencyComponent } from './interest-posting-frequency/interest-posting-frequency.component';

import { DenominationTypesComponent } from './denomination-types/denomination-types.component';
import { AddDenominationTypesComponent } from './denomination-types/add-denomination-types/add-denomination-types.component';
import { CoveredVillagesComponent } from './covered-villages/covered-villages.component';
import { AddCoveredVillagesComponent } from './covered-villages/add-covered-villages/add-covered-villages.component';
import { PacsDetailsComponent } from './pacs-details/pacs-details.component';
import { AddPacsDetailsComponent } from './pacs-details/add-pacs-details/add-pacs-details.component';
import { SocietyBranchComponent } from './society-branch/society-branch.component';
import { AddSocietyBranchComponent } from './society-branch/add-society-branch/add-society-branch.component';
import { OperatorTypeComponent } from './operator-type/operator-type.component';
import { AddOperatorTypeComponent } from './operator-type/add-operator-type/add-operator-type.component';
import { DccbComponent } from './dccb/dccb.component';
import { AddDccbComponent } from './dccb/add-dccb/add-dccb.component';
import { DccbBranchComponent } from './dccb-branch/dccb-branch.component';
import { MemberTypeComponent } from './member-type/member-type.component';
import { AddMemberTypeComponent } from './member-type/add-member-type/add-member-type.component';
import { DesignationTypesComponent } from './designation-types/designation-types.component';
import { AddDesignationTypesComponent } from './designation-types/add-designation-types/add-designation-types.component';
import { AddDccbBranchComponent } from './dccb-branch/add-dccb-branch/add-dccb-branch.component';
import { KycDocumentTypes } from './kyc-document-types/shared/kyc-document-types.model';
import { KycDocumentTypesComponent } from './kyc-document-types/kyc-document-types.component';
import { AddKycDocumentTypesComponent } from './kyc-document-types/add-kyc-document-types/add-kyc-document-types.component';
const routes: Routes = [
  {
      path: '', component: CommonConfigComponent,
      children: [
        { path: 'state', component: StateComponent},
        { path: 'district', component: DistrictComponent},
        { path: 'add_district', component:AddDistrictComponent},
        { path: 'sub_district', component: SubDistrictComponent},
        { path: 'add_sub_district', component: AddSubDistrictComponent},
        { path: 'villages', component: VillagesComponent},
        { path: 'add_villages', component: AddVillagesComponent},
        { path: 'add_state', component: AddStateComponent},
        { path: 'block', component: BlockComponent },
        { path: 'add_block', component: AddBlockComponent },
        { path: 'division', component: DivisionComponent },
        { path: 'add_division', component: AddDivisionComponent },
   
        { path: 'occupation_types', component: OccupationTypesComponent },
        { path: 'add_occupation_type', component: AddOccupationTypesComponent },
        { path: 'qualification', component: QualificationComponent },
        { path: 'add_qualification', component: AddQualificationComponent },
        { path: 'transaction_mode', component: TransactionModeComponent },
        { path: 'add_transaction_mode', component: AddTransactionModeComponent },
        { path: 'account_types', component: AccountTypesComponent },
        { path: 'add_account_type', component:AddAccountTypesComponent  },
        { path: 'caste', component: CasteComponent },
        { path: 'add_caste', component: AddCasteComponent },  
      
        { path: 'community', component: CommunityComponent },
        { path: 'add_community', component: AddCommunityComponent },
        { path: 'interest_posting_frequency', component: InterestPostingFrequencyComponent },
        { path: 'add_interest_posting_frequency', component: AddInterestPostingFrequencyComponent },

      
    
        { path: 'relation_types', component: RelationshipTypeComponent },
        { path: 'add_relation_type', component: AddRelationshiTypeComponent },
       
        { path: 'dccb', component: DccbComponent },
        { path: 'add_dccb', component: AddDccbComponent },
        { path: 'dccb_branch', component: DccbBranchComponent },
        { path: 'add_dccb_branch', component: AddDccbBranchComponent },
        { path: 'denomination_types', component: DenominationTypesComponent },
        { path: 'add_denomination_type', component: AddDenominationTypesComponent },
        { path: 'member_types', component: MemberTypeComponent },
        { path: 'add_member_type', component: AddMemberTypeComponent },
        { path: 'covered_villages', component: CoveredVillagesComponent },
        { path: 'add_covered_villages', component: AddCoveredVillagesComponent },
        { path: 'society', component: PacsDetailsComponent },
        { path: 'add_society', component: AddPacsDetailsComponent },
        { path: 'society_branch', component: SocietyBranchComponent },
        { path: 'add_society_branch', component: AddSocietyBranchComponent },
        { path: 'operator_types', component:OperatorTypeComponent },
        { path: 'add_operator_type', component: AddOperatorTypeComponent },
        { path: 'designation_types', component:DesignationTypesComponent },
        { path: 'add_designation_type', component: AddDesignationTypesComponent },
        { path: 'kyc_document_types', component:KycDocumentTypesComponent },
        { path: 'add_kyc_document_type', component: AddKycDocumentTypesComponent },


      ]
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonConfigRoutingModule { }
