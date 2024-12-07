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
import { DailyDepositsTransactionComponent } from './daily-deposits-transaction.component';
import { DailyDepositTransactionRoutingModule } from './daily-deposit-transaction-routing.module';
import { DailyDepositStepperComponent } from './daily-deposit-stepper/daily-deposit-stepper.component';
import { ProductDetailsComponent } from './daily-deposit-stepper/product-details/product-details.component';
import { CommunicationComponent } from './daily-deposit-stepper/communication/communication.component';
import { KycComponent } from './daily-deposit-stepper/kyc/kyc.component';
import { NomineeComponent } from './daily-deposit-stepper/nominee/nominee.component';
import { ViewDailyDepositsComponent } from './view-daily-deposits/view-daily-deposits.component';
import { MembershipBasicDetailsComponent } from './daily-deposit-stepper/membership-basic-details/membership-basic-details.component';
import { NewMembershipComponent } from './daily-deposit-stepper/new-membership/new-membership.component';
import { InstallmentChartsComponent } from './operations/installment-charts/installment-charts.component';
import { ForeclosureComponent } from './operations/foreclosure/foreclosure.component';
import { ClosureComponent } from './operations/closure/closure.component';
import { DailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/daily-deposits-product-definition.component';
import { AddDailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/add-daily-deposits-product-definition.component';
import { ViewDailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/view-daily-deposits-product-definition/view-daily-deposits-product-definition.component';
import { GeneralConfigComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/general-config/general-config.component';
import { InterestPolicyComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/interest-policy/interest-policy.component';
import { PenalityConfigComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/penality-config/penality-config.component';
import { RequiredDocumentsComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/required-documents/required-documents.component';
import { MessageModule } from 'primeng/message';

export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    DailyDepositsTransactionComponent,
    DailyDepositStepperComponent,
    ProductDetailsComponent,
    CommunicationComponent,
    KycComponent,
    NomineeComponent,
    ViewDailyDepositsComponent,
    MembershipBasicDetailsComponent,
    NewMembershipComponent,
    InstallmentChartsComponent,
    ForeclosureComponent,
    ClosureComponent,
    DailyDepositsProductDefinitionComponent,
    AddDailyDepositsProductDefinitionComponent,
    ViewDailyDepositsProductDefinitionComponent,
    GeneralConfigComponent,
    InterestPolicyComponent,
    PenalityConfigComponent,
    RequiredDocumentsComponent   
  ],
  imports: [
    CommonModule,
    DailyDepositTransactionRoutingModule,
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
   HttpClientModule,
   MessageModule
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class DailyDepositTransactionModule { }
