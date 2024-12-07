import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DailyDepositsConfigRoutingModule } from './daily-deposits-config-routing.module';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { DailyDepositsConfigComponent } from './daily-deposits-config.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';

import { ReasonsComponent } from './reasons/reasons.component';
import { ServiceTypesComponent } from './service-types/service-types.component';
import { SettingsComponent } from './settings/settings.component';

import { AddReasonsComponent } from './reasons/add-reasons/add-reasons.component';
import { AddServiceTypesComponent } from './service-types/add-service-types/add-service-types.component';
import { AddSettingsComponent } from './settings/add-settings/add-settings.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';

import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { MessageModule } from 'primeng/message';

export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [

   DailyDepositsConfigComponent,
  
    CommonCategoryComponent,
       AddCommonCategoryComponent,
       WorkFlowComponent,
      DocumentTypesComponent,
       ReasonsComponent,
       ServiceTypesComponent,
       SettingsComponent,
       AddDocumentTypesComponent,
       AddReasonsComponent,
       AddServiceTypesComponent,
       AddSettingsComponent,
       AddWorkFlowComponent
  ],
  imports: [
    CommonModule,
    DailyDepositsConfigRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengMaterialUiModule,
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
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class DailyDepositsConfigModule { }
