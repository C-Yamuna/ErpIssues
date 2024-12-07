import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SbConfigRoutingModule } from './sb-config-routing.module';
import { SbConfigComponent } from './sb-config.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';

import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddDebitCardTypesComponent } from './debit-card-types/add-debit-card-types/add-debit-card-types.component';
import { DebitCardTypesComponent } from './debit-card-types/debit-card-types.component';



import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { AddProductTypeComponent } from './product-type/add-product-type/add-product-type.component';
import { SbSettingsComponent } from './sb-settings/sb-settings.component';
import { AddSbSettingsComponent } from './sb-settings/add-sb-settings/add-sb-settings.component';
import { SbFormTypeComponent } from './sb-form-type/sb-form-type.component';
import { AddSbFormTypeComponent } from './sb-form-type/add-sb-form-type/add-sb-form-type.component';
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
    SbConfigComponent,

    CommonCategoryComponent,
    AddCommonCategoryComponent,
    DebitCardTypesComponent,
    AddDebitCardTypesComponent,
    WorkFlowComponent,
    AddWorkFlowComponent,
    ProductTypeComponent,
    SbSettingsComponent,

    AddSbSettingsComponent,
    ProductTypeComponent,
    AddProductTypeComponent,
    SbSettingsComponent,
    SbFormTypeComponent,
    AddSbFormTypeComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent,
    
    ServiceTypesComponent,
    AddServiceTypesComponent,
    DocumentTypesComponent,
    AddDocumentTypesComponent,
  ],
  imports: [
    CommonModule,
    SbConfigRoutingModule,
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
    CommonComponent
  ]
})
export class SbConfigModule { }
