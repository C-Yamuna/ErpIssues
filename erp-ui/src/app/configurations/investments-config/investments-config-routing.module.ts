import { NgModule } from '@angular/core';
import { InvestmentsConfigComponent } from './investments-config.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddInvestedBankDetailsComponent } from './invested-bank-details/add-invested-bank-details/add-invested-bank-details.component';
import { InvestedBankDetailsComponent } from './invested-bank-details/invested-bank-details.component';

import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';


const routes: Routes = [
  {
      path: '', component: InvestmentsConfigComponent,
      children: [
        { path: 'common_category', component: CommonCategoryComponent},

        { path: 'add_common_category', component: AddCommonCategoryComponent},

        { path: 'invested_bank_details', component: InvestedBankDetailsComponent},

        { path: 'add_invested_bank_details', component: AddInvestedBankDetailsComponent},   

        { path: 'document_types', component: DocumentTypesComponent},

        { path: 'add_document_type', component: AddDocumentTypesComponent},

        { path: 'workflow', component: WorkFlowComponent},

        { path: 'add_workflow', component: AddWorkFlowComponent}, 
      ]
  }
 ]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsConfigRoutingModule { }
