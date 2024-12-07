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
import { CashierConfigRoutingModule } from './cashier-config-routing.module';
import { CashierConfigComponent } from './cashier-config.component';


import { CommonCategoryComponent } from './common-category/common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CashierConfigComponent,
   
 
    CommonCategoryComponent,
    WorkFlowComponent,
    AddCommonCategoryComponent,
    AddWorkFlowComponent,
  ],
  imports: [
    CommonModule,
    CashierConfigRoutingModule,
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
export class cashierConfigModule { }
