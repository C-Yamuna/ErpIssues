import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SbConfigComponent } from './sb-config.component';

import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { DebitCardTypesComponent } from './debit-card-types/debit-card-types.component';
import { AddDebitCardTypesComponent } from './debit-card-types/add-debit-card-types/add-debit-card-types.component';

import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { AddProductTypeComponent } from './product-type/add-product-type/add-product-type.component';
import { SbSettingsComponent } from './sb-settings/sb-settings.component';
import { AddSbSettingsComponent } from './sb-settings/add-sb-settings/add-sb-settings.component';
import { SbFormTypeComponent } from './sb-form-type/sb-form-type.component';
import { AddSbFormTypeComponent } from './sb-form-type/add-sb-form-type/add-sb-form-type.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';

import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';

const routes: Routes = [
  {
    path: '', component: SbConfigComponent,
    children: [

      { path: 'common_category', component:CommonCategoryComponent },
      { path: 'add_common_category', component:AddCommonCategoryComponent },
      { path: 'debit_card_types', component:DebitCardTypesComponent },
      { path: 'add_debit_card_type', component:AddDebitCardTypesComponent },
      { path: 'workflow', component:WorkFlowComponent },
      { path: 'add_workflow', component:AddWorkFlowComponent },
      { path: 'product_types', component:ProductTypeComponent },
      { path: 'add_product_type', component:AddProductTypeComponent },
      { path: 'settings', component:SbSettingsComponent },
      { path: 'add_setting', component:AddSbSettingsComponent },
      { path: 'form_types', component:SbFormTypeComponent },
      { path: 'add_form_types', component:AddSbFormTypeComponent },
      { path: 'document_types', component:DocumentTypesComponent },
      { path: 'add_document_type', component:AddDocumentTypesComponent },
      { path: 'service_types', component:ServiceTypesComponent },
      { path: 'add_service_type', component:AddServiceTypesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SbConfigRoutingModule { }
