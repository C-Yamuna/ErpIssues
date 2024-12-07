import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentDetailsConfigComponent } from './agent-details-config.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { AgentSecurityConfigComponent } from './agent-security-config/agent-security-config.component';
import { AddDeviceConfigComponent } from './device-config/add-device-config/add-device-config.component';
import { AddAgentSecurityConfigComponent } from './agent-security-config/add-agent-security-config/add-agent-security-config.component';
import { AgentCommissionPolicyComponent } from './agent-commission-policy/agent-commission-policy.component';
import { AddAgentCommissionPolicyComponent } from './agent-commission-policy/add-agent-commission-policy/add-agent-commission-policy.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';

import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';

const routes: Routes = [
  {
      path: '', component: AgentDetailsConfigComponent,
      children: [
        { path: 'device_config', component: DeviceConfigComponent},
        { path: 'add_device_config', component: AddDeviceConfigComponent},
        { path: 'security_config', component: AgentSecurityConfigComponent},
        { path: 'add_security_config', component: AddAgentSecurityConfigComponent},
        { path: 'commission_policy', component: AgentCommissionPolicyComponent},
        { path: 'add_commission_policy', component: AddAgentCommissionPolicyComponent},


        { path: 'common_category', component: CommonCategoryComponent},
        { path: 'add_common_category', component: AddCommonCategoryComponent},

        { path: 'document_types', component: DocumentTypesComponent},
        { path: 'add_document_type', component: AddDocumentTypesComponent},

        { path: 'workflow', component: WorkFlowComponent},
        { path: 'add_workflow', component: AddWorkFlowComponent},
      ]
    }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentDetailsConfigRoutingModule { }
