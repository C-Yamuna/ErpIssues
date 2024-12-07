import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BorrowingConfigRoutingModule } from './borrowing-config-routing.module';
import { BorrowingConfigComponent } from './borrowing-config.component';

import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { FinancialBankDetailsComponent } from './financial-bank-details/financial-bank-details.component';

import { AddFinancialBankDetailsComponent } from './financial-bank-details/add-financial-bank-details/add-financial-bank-details.component';

import { AddDocumentTypesComponent } from './document-types/add-document-types/add-document-types.component';
import { DocumentTypesComponent } from './document-types/document-types.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    BorrowingConfigComponent,
  
    CommonCategoryComponent,
    AddCommonCategoryComponent,
    WorkFlowComponent,
    AddWorkFlowComponent,
    FinancialBankDetailsComponent,
   DocumentTypesComponent,
    AddFinancialBankDetailsComponent,
    AddDocumentTypesComponent,
   
  ],
  imports: [
    CommonModule,
    BorrowingConfigRoutingModule,
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
   TableModule
  ],
  providers:[
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class BorrowingConfigModule { }
