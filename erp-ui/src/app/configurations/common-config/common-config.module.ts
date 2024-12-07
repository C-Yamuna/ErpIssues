import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonConfigRoutingModule } from './common-config-routing.module';
import { CommonConfigComponent } from './common-config.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';
import { SubDistrictComponent } from './sub-district/sub-district.component';

import { OccupationTypesComponent } from './occupation-types/occupation-types.component';
import { QualificationComponent } from './qualification/qualification.component';
import { BlockComponent } from './block/block.component';
import { DivisionComponent } from './division/division.component';
import { TransactionModeComponent } from './transaction-mode/transaction-mode.component';

import { AddBlockComponent } from './block/add-block/add-block.component';
import { AddDivisionComponent } from './division/add-division/add-division.component';

import { AddOccupationTypesComponent } from './occupation-types/add-occupation-types/add-occupation-types.component';
import { AddQualificationComponent } from './qualification/add-qualification/add-qualification.component';
import { AddStateComponent } from './state/add-state/add-state.component';
import { AddTransactionModeComponent } from './transaction-mode/add-transaction-mode/add-transaction-mode.component';



import { AccountTypesComponent } from './account-types/account-types.component';
import { AddAccountTypesComponent } from './account-types/add-account-types/add-account-types.component';
import { CasteComponent } from './caste/caste.component';
import { AddCasteComponent } from './caste/add-caste/add-caste.component';

import { AddSubDistrictComponent } from './sub-district/add-sub-district/add-sub-district.component';
import { VillagesComponent } from './villages/villages.component';
import { AddVillagesComponent } from './villages/add-villages/add-villages.component';

import { RelationshipTypeComponent } from './relationship-type/relationship-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { CommunityComponent } from './community/community.component';
import { AddCommunityComponent } from './community/add-community/add-community.component';
import { AddRelationshiTypeComponent } from './relationship-type/add-relationshi-type/add-relationshi-type.component';

import { AddDistrictComponent } from './district/add-district/add-district.component';
// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


import { AccountsTypesService } from './account-types/shared/accounts-types.service';
import { CasteService } from './caste/shared/caste.service';
import { CommunityService } from './community/shared/community.service';
import { DistrictService } from './district/shared/district.service';

import { OccupationTypesService } from './occupation-types/shared/occupation-types.service';


import { QualificationService } from './qualification/shared/qualification.service';

import { RelationshipTypeService } from './relationship-type/shared/relationship-type.service';
import { StatesService } from './state/shared/states.service';
import { SubDistrictService } from './sub-district/shared/sub-district.service';
import { TransactionModesService } from './transaction-mode/shared/transaction-modes.service';
import { VillagesService } from './villages/shared/villages.service';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { InterestPostingFrequencyComponent } from './interest-posting-frequency/interest-posting-frequency.component';
import { AddInterestPostingFrequencyComponent } from './interest-posting-frequency/add-interest-posting-frequency/add-interest-posting-frequency.component';
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
import { AddDccbBranchComponent } from './dccb-branch/add-dccb-branch/add-dccb-branch.component';
import { DenominationTypesComponent } from './denomination-types/denomination-types.component';
import { AddDenominationTypesComponent } from './denomination-types/add-denomination-types/add-denomination-types.component';
import { MemberTypeComponent } from './member-type/member-type.component';
import { AddMemberTypeComponent } from './member-type/add-member-type/add-member-type.component';
import { DesignationTypesComponent } from './designation-types/designation-types.component';
import { AddDesignationTypesComponent } from './designation-types/add-designation-types/add-designation-types.component';
import { KycDocumentTypesComponent } from './kyc-document-types/kyc-document-types.component';
import { AddKycDocumentTypesComponent } from './kyc-document-types/add-kyc-document-types/add-kyc-document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CommonConfigComponent,
    StateComponent,
    DistrictComponent,
    SubDistrictComponent,

    OccupationTypesComponent,
    QualificationComponent,
    BlockComponent,
    DivisionComponent,
    TransactionModeComponent,

    AddBlockComponent,
    AddDivisionComponent,

    AddOccupationTypesComponent,
    AddQualificationComponent,
    AddStateComponent,
    AddTransactionModeComponent,


    AccountTypesComponent,
    AddAccountTypesComponent,
    CasteComponent,
    AddCasteComponent,

    AddSubDistrictComponent,
    VillagesComponent,
    AddVillagesComponent,

    RelationshipTypeComponent,

    CommunityComponent,
    AddCommunityComponent,

    AddRelationshiTypeComponent,


    AddDistrictComponent,

    InterestPostingFrequencyComponent,
    AddInterestPostingFrequencyComponent,
    CoveredVillagesComponent,
    AddCoveredVillagesComponent,
    PacsDetailsComponent,
    AddPacsDetailsComponent,
    SocietyBranchComponent,
    AddSocietyBranchComponent,
    OperatorTypeComponent,
    AddOperatorTypeComponent,
    DccbComponent,
    AddDccbComponent,
    DccbBranchComponent,
    AddDccbBranchComponent,
    DenominationTypesComponent,
    AddDenominationTypesComponent,
    MemberTypeComponent,
    AddMemberTypeComponent,
    DesignationTypesComponent,
    AddDesignationTypesComponent,
    KycDocumentTypesComponent,
    AddKycDocumentTypesComponent
    
  ],
  imports: [
    CommonModule,
    CommonConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengMaterialUiModule,
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
  providers:[
    AccountsTypesService,
    CasteService,
    CommunityService,
    DistrictService,
   
    OccupationTypesService,
   
    QualificationService,
  
    RelationshipTypeService,
   
    StatesService,
    SubDistrictService,
    TransactionModesService,
    VillagesService,
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent
  ]
})
export class CommonConfigModule { }
