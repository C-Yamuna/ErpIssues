import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowingConfigComponent } from './borrowing-config.component';

import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { FinancialBankDetailsComponent } from './financial-bank-details/financial-bank-details.component';
import { AddFinancialBankDetailsComponent } from './financial-bank-details/add-financial-bank-details/add-financial-bank-details.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
const routes: Routes = [
  {
      path: '', component: BorrowingConfigComponent,
      children: [
        
        
        { path: 'common_category', component: CommonCategoryComponent},
        { path: 'add_common_category', component: AddCommonCategoryComponent},
        { path: 'workflow', component: WorkFlowComponent},
        { path: 'add_workflow', component: AddWorkFlowComponent},
        

        { path: 'financial_bank_details', component: FinancialBankDetailsComponent},
        { path: 'add_financial_bank_details', component: AddFinancialBankDetailsComponent},
        { path: 'document_type', component: DocumentTypesComponent},
        { path: 'add_document_type', component: AddDocumentTypesComponent},
       
      ]
  }
 ];
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowingConfigRoutingModule { }
