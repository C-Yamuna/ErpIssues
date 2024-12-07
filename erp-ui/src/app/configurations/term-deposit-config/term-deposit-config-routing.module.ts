import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermDepositConfigComponent } from './term-deposit-config.component';
import { TdSettingsComponent } from './td-settings/td-settings.component';
import { TdAddSettingsComponent } from './td-settings/td-add-settings/td-add-settings.component';
import { TdCommonCategoryComponent } from './td-common-category/td-common-category.component';
import { TdAddCommonCategoryComponent } from './td-common-category/td-add-common-category/td-add-common-category.component';
import { TdWorkFlowComponent } from './td-work-flow/td-work-flow.component';
import { TdAddWorkFlowComponent } from './td-work-flow/td-add-work-flow/td-add-work-flow.component';
import { TermDepositTypesComponent } from './term-deposit-types/term-deposit-types.component';
import { AddTermDepositTypesComponent } from './term-deposit-types/add-term-deposit-types/add-term-deposit-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';

const routes: Routes = [
  {
    path: '', component: TermDepositConfigComponent,
    children: [
      { path: 'settings', component: TdSettingsComponent },
      { path: 'add_setting', component: TdAddSettingsComponent },
      { path: 'common_category', component: TdCommonCategoryComponent },
      { path: 'add_common_category', component: TdAddCommonCategoryComponent },
      { path: 'workflow', component: TdWorkFlowComponent },
      { path: 'add_workflow', component: TdAddWorkFlowComponent },
      { path: 'form_types', component: TermDepositTypesComponent },
      { path: 'add_form_types', component: AddTermDepositTypesComponent },
      { path: 'document_types', component: DocumentTypesComponent },
      { path: 'add_document_type', component: AddDocumentTypesComponent },
      { path: 'service_types', component: ServiceTypesComponent },
      { path: 'add_service_type', component: AddServiceTypesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermDepositConfigRoutingModule { }
