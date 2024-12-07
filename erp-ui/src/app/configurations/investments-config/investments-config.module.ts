import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { InvestedBankDetailsComponent } from './invested-bank-details/invested-bank-details.component';

import { WorkFlowComponent } from './work-flow/work-flow.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InvestmentsConfigRoutingModule } from './investments-config-routing.module';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddInvestedBankDetailsComponent } from './invested-bank-details/add-invested-bank-details/add-invested-bank-details.component';

import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { InvestmentsConfigComponent } from './investments-config.component';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    InvestmentsConfigComponent,
    CommonCategoryComponent,
    InvestedBankDetailsComponent,

    DocumentTypesComponent,
    WorkFlowComponent,
    AddCommonCategoryComponent,
    AddInvestedBankDetailsComponent,

    AddDocumentTypesComponent,
    AddWorkFlowComponent
  ],
  imports: [
    CommonModule,
    InvestmentsConfigRoutingModule,
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
export class InvestmentsConfigModule { }
