import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermDepositConfigRoutingModule } from './term-deposit-config-routing.module';
import { TermDepositConfigComponent } from './term-deposit-config.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TdSettingsComponent } from './td-settings/td-settings.component';

import { TdCommonCategoryComponent } from './td-common-category/td-common-category.component';
import { TdWorkFlowComponent } from './td-work-flow/td-work-flow.component';

import { TdAddSettingsComponent } from './td-settings/td-add-settings/td-add-settings.component';

import { TdAddCommonCategoryComponent } from './td-common-category/td-add-common-category/td-add-common-category.component';
import { TdAddWorkFlowComponent } from './td-work-flow/td-add-work-flow/td-add-work-flow.component';

// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Settings } from './td-settings/shared/settings.model';
import { SettingsService } from './td-settings/shared/settings.service';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TermDepositTypesComponent } from './term-deposit-types/term-deposit-types.component';
import { AddTermDepositTypesComponent } from './term-deposit-types/add-term-deposit-types/add-term-deposit-types.component';

import { ServiceTypesComponent } from './service-types/service-types.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    TermDepositConfigComponent,
    TdSettingsComponent,
    TdCommonCategoryComponent,
    TdWorkFlowComponent,
    
    TdAddSettingsComponent,
    TdAddCommonCategoryComponent,
    TdAddWorkFlowComponent,
    TermDepositTypesComponent,
    AddTermDepositTypesComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent,
    ServiceTypesComponent,
    AddServiceTypesComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent
  ],
  imports: [
    CommonModule,
    TermDepositConfigRoutingModule,
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
  providers:[
    SettingsService,
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent
  ]
  
})
export class TermDepositConfigModule { }
