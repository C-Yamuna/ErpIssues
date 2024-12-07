import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanConfigRoutingModule } from './loan-config-routing.module';
import { LoanConfigComponent } from './loan-config.component';
import { LoanAccountTypeComponent } from './loan-account-type/loan-account-type.component';
import { AddLoanAccountTypeComponent } from './loan-account-type/add-loan-account-type/add-loan-account-type.component';
import { RepaymentModeComponent } from './repayment-mode/repayment-mode.component';
import { AddRepaymentModeComponent } from './repayment-mode/add-repayment-mode/add-repayment-mode.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChargesTypesComponent } from './charges-types/charges-types.component';
import { AddChargesTypesComponent } from './charges-types/add-charges-types/add-charges-types.component';
import { CropTypesComponent } from './crop-types/crop-types.component';
import { AddCropTypesComponent } from './crop-types/add-crop-types/add-crop-types.component';
import { ScaleOfFinanceConfigComponent } from './scale-of-finance-config/scale-of-finance-config.component';
import { CollateralTypesComponent } from './collateral-types/collateral-types.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddCollateralTypesComponent } from './collateral-types/add-collateral-types/add-collateral-types.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddLoanPurposeComponent } from './loan-purpose/add-loan-purpose/add-loan-purpose.component';
import { AddScaleOfFinanceConfigComponent } from './scale-of-finance-config/add-scale-of-finance-config/add-scale-of-finance-config.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FarmerTypesComponent } from './farmer-types/farmer-types.component';
import { AddFarmerTypesComponent } from './farmer-types/add-farmer-types/add-farmer-types.component';
import { InsurerDetailsComponent } from './insurer-details/insurer-details.component';

import { AddInsurerDetailsComponent } from './insurer-details/add-insurer-details/add-insurer-details.component';

import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';
import { ApportionTypesComponent } from './apportion-types/apportion-types.component';
import { AddApportionTypesComponent } from './apportion-types/add-apportion-types/add-apportion-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoanConfigComponent,
    LoanAccountTypeComponent,
    AddLoanAccountTypeComponent,
    RepaymentModeComponent,
    AddRepaymentModeComponent,
    ChargesTypesComponent,
    AddChargesTypesComponent,
    CropTypesComponent,
    AddCropTypesComponent,
    ScaleOfFinanceConfigComponent,
    CollateralTypesComponent,
    LoanPurposeComponent,
    CommonCategoryComponent,
    WorkFlowComponent,
    AddCollateralTypesComponent,
    AddCommonCategoryComponent,
    AddLoanPurposeComponent,
    AddScaleOfFinanceConfigComponent,
    AddWorkFlowComponent,
    FarmerTypesComponent,
    AddFarmerTypesComponent,
    InsurerDetailsComponent,
    DocumentTypesComponent,
    AddInsurerDetailsComponent,
    AddDocumentTypesComponent,
    ServiceTypesComponent,
    AddServiceTypesComponent,
    ApportionTypesComponent,
    AddApportionTypesComponent,
  ],
  imports: [
    CommonModule,
    LoanConfigRoutingModule,
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
  ]
})
export class LoanConfigModule { }
