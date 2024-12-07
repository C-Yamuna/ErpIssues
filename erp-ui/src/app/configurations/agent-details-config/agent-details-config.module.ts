import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgentDetailsConfigRoutingModule } from './agent-details-config-routing.module';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { AgentDetailsConfigComponent } from './agent-details-config.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { AgentSecurityConfigComponent } from './agent-security-config/agent-security-config.component';
import { AgentCommissionPolicyComponent } from './agent-commission-policy/agent-commission-policy.component';
import { AddAgentCommissionPolicyComponent } from './agent-commission-policy/add-agent-commission-policy/add-agent-commission-policy.component';
import { AddAgentSecurityConfigComponent } from './agent-security-config/add-agent-security-config/add-agent-security-config.component';
import { AddDeviceConfigComponent } from './device-config/add-device-config/add-device-config.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';

import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';

import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AgentDetailsConfigComponent,
    DeviceConfigComponent,
    AgentSecurityConfigComponent,
    AgentCommissionPolicyComponent,

    AddAgentCommissionPolicyComponent,
    AddAgentSecurityConfigComponent,

    AddDeviceConfigComponent,
    CommonCategoryComponent,
    WorkFlowComponent,
    DocumentTypesComponent,
    AddCommonCategoryComponent,
   AddDocumentTypesComponent,
    AddWorkFlowComponent
  ],
  imports: [
    CommonModule,
    AgentDetailsConfigRoutingModule,
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
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class AgentDetailsConfigModule { }
