import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LockerTransactionComponent } from './locker-transaction.component';
import { LockerTransactionRoutingModule } from './locker-transaction-routing.module';


export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    LockerTransactionComponent,
   

  
   
    
  ],
  imports: [
    CommonModule,
    LockerTransactionRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
   TranslateModule,
   HttpClientModule
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class LockerTransactionModule { }
