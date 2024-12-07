import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DailyDepositsConfigComponent } from './daily-deposits-config.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { ReasonsComponent } from './reasons/reasons.component';
import { AddReasonsComponent } from './reasons/add-reasons/add-reasons.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';
import { SettingsComponent } from './settings/settings.component';
import { AddSettingsComponent } from './settings/add-settings/add-settings.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';

const routes: Routes = [
  {
      path: '', component: DailyDepositsConfigComponent,
      children: [
        
        
        { path: 'common_category', component: CommonCategoryComponent},
        { path: 'add_common_category', component: AddCommonCategoryComponent},
        { path: 'workflow', component: WorkFlowComponent},
        { path: 'add_workflow', component: AddWorkFlowComponent},
        { path: 'service_types', component: ServiceTypesComponent},
        { path: 'add_service_type', component: AddServiceTypesComponent},

        { path: 'reasons', component: ReasonsComponent},
        { path: 'add_reason', component: AddReasonsComponent},
        { path: 'document_types', component: DocumentTypesComponent},
        { path: 'add_document_type', component: AddDocumentTypesComponent},
        { path: 'settings', component: SettingsComponent},
        { path: 'add_setting', component: AddSettingsComponent},
       
      ]
  }
 ];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyDepositsConfigRoutingModule { }
