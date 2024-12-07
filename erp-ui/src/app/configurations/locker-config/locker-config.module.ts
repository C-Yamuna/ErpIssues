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
import { LockerConfigRoutingModule } from './locker-config-routing.module';
import { LockerConfigComponent } from './locker-config.component';
import { LockerVendorDetailsComponent } from './locker-vendor-details/locker-vendor-details.component';
import { AddLockerVendorDetailsComponent } from './locker-vendor-details/add-locker-vendor-details/add-locker-vendor-details.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { LockerConfigsComponent } from './locker-configs/locker-configs.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddLockerConfigsComponent } from './locker-configs/add-locker-configs/add-locker-configs.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';

import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    LockerConfigComponent,
    LockerVendorDetailsComponent,
    AddLockerVendorDetailsComponent,
    CommonCategoryComponent,
    WorkFlowComponent,
    LockerConfigsComponent,
    AddCommonCategoryComponent,
    AddLockerConfigsComponent,
    AddWorkFlowComponent,
  
   
  ],
  imports: [
    CommonModule,
    LockerConfigRoutingModule,
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
export class LockerConfigModule { }
