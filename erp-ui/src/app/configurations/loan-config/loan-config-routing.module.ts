import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanConfigComponent } from './loan-config.component';
import { LoanAccountTypeComponent } from './loan-account-type/loan-account-type.component';
import { AddLoanAccountTypeComponent } from './loan-account-type/add-loan-account-type/add-loan-account-type.component';
import { AddRepaymentModeComponent } from './repayment-mode/add-repayment-mode/add-repayment-mode.component';
import { RepaymentModeComponent } from './repayment-mode/repayment-mode.component';
import { ChargesTypesComponent } from './charges-types/charges-types.component';
import { AddChargesTypesComponent } from './charges-types/add-charges-types/add-charges-types.component';
import { CropTypesComponent } from './crop-types/crop-types.component';
import { AddCropTypesComponent } from './crop-types/add-crop-types/add-crop-types.component';
import { ScaleOfFinanceConfigComponent } from './scale-of-finance-config/scale-of-finance-config.component';
import { AddScaleOfFinanceConfigComponent } from './scale-of-finance-config/add-scale-of-finance-config/add-scale-of-finance-config.component';
import { CollateralTypesComponent } from './collateral-types/collateral-types.component';
import { AddCollateralTypesComponent } from './collateral-types/add-collateral-types/add-collateral-types.component';
import { LoanPurposeComponent } from './loan-purpose/loan-purpose.component';
import { AddLoanPurposeComponent } from './loan-purpose/add-loan-purpose/add-loan-purpose.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { FarmerTypesComponent } from './farmer-types/farmer-types.component';
import { AddFarmerTypesComponent } from './farmer-types/add-farmer-types/add-farmer-types.component';
import { InsurerDetailsComponent } from './insurer-details/insurer-details.component';
import { AddInsurerDetailsComponent } from './insurer-details/add-insurer-details/add-insurer-details.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';
import { AddApportionTypesComponent } from './apportion-types/add-apportion-types/add-apportion-types.component';
import { ApportionTypesComponent } from './apportion-types/apportion-types.component';


const routes: Routes = [
  {
      path:'', component: LoanConfigComponent,
      children: [
        { path: 'apportion_types', component:ApportionTypesComponent },
        { path: 'add_apportion_type', component:AddApportionTypesComponent },
        { path: 'account_types', component:LoanAccountTypeComponent},
        { path: 'add_account_type', component:AddLoanAccountTypeComponent },
        { path: 'repayment_mode', component:RepaymentModeComponent },
        { path: 'add_repayment_mode', component:AddRepaymentModeComponent },
        { path: 'charges_types', component:ChargesTypesComponent },
        { path: 'add_charges_type', component:AddChargesTypesComponent },
        { path: 'crop_types', component:CropTypesComponent },
        { path: 'add_crop_type', component:AddCropTypesComponent },
        { path: 'scale_of_finance_config', component:ScaleOfFinanceConfigComponent },
        { path: 'add_scale_of_finance_config', component:AddScaleOfFinanceConfigComponent },
        { path: 'collateral_types', component:CollateralTypesComponent },
        { path: 'add_collateral_type', component:AddCollateralTypesComponent },
        { path: 'purpose', component:LoanPurposeComponent },
        { path: 'add_purpose', component:AddLoanPurposeComponent },
        { path: 'common_category', component:CommonCategoryComponent },
        { path: 'add_common_category', component:AddCommonCategoryComponent },
        { path: 'workflow', component:WorkFlowComponent },
        { path: 'add_workflow', component:AddWorkFlowComponent },
        { path: 'farmer_types', component:FarmerTypesComponent },
        { path: 'add_farmer_type', component:AddFarmerTypesComponent },
        { path: 'insurer_details', component:InsurerDetailsComponent },
        { path: 'add_insurer_details', component:AddInsurerDetailsComponent },
        { path: 'document_types', component:DocumentTypesComponent },
        { path: 'add_document_type', component:AddDocumentTypesComponent },
        { path: 'service_types', component:ServiceTypesComponent },
        { path: 'add_service_type', component:AddServiceTypesComponent },
      ]
  }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanConfigRoutingModule { }
