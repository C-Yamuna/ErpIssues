import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChipsModule } from 'primeng/chips';

import { SavingsBankTranscationRoutingModule } from './savings-bank-transcation-routing.module';
import { SavingsBankTranscationComponent } from './savings-bank-transcation.component';
import { SavingsBankAccountCreationStepperComponent } from './savings-bank-account-creation-stepper/savings-bank-account-creation-stepper.component';
import { SavingsBankApplicationComponent } from './savings-bank-account-creation-stepper/savings-bank-application/savings-bank-application.component';
import { SavingsBankCommunicationComponent } from './savings-bank-account-creation-stepper/savings-bank-communication/savings-bank-communication.component';
import { SavingsBankJointAccountComponent } from './savings-bank-account-creation-stepper/savings-bank-joint-account/savings-bank-joint-account.component';
import { SavingsBankKycComponent } from './savings-bank-account-creation-stepper/savings-bank-kyc/savings-bank-kyc.component';
import { SavingsBankNomineeComponent } from './savings-bank-account-creation-stepper/savings-bank-nominee/savings-bank-nominee.component';
import { SavingsBankServicesComponent } from './savings-bank-account-creation-stepper/savings-bank-services/savings-bank-services.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SbTransactionsComponent } from './sb-transactions/sb-transactions.component';
import { StandingInstructionComponent } from './sb-operations/standing-instruction/standing-instruction.component';
import { AmountBlockComponent } from './sb-operations/amount-block/amount-block.component';
import { ChequebookIssueComponent } from './sb-operations/chequebook-issue/chequebook-issue.component';
import { ClosureComponent } from './sb-operations/closure/closure.component';
import { DeathClaimComponent } from './sb-operations/death-claim/death-claim.component';
import { AccountServiceComponent } from './sb-operations/account-service/account-service.component';
import { DebitcardIssueComponent } from './sb-operations/debitcard-issue/debitcard-issue.component';
import { ViewSavingsBankComponent } from './view-savings-bank/view-savings-bank.component';
import { SavingsBankProductDefinitionComponent } from './savings-bank-product-definition/savings-bank-product-definition.component';
import { AddSbProductDefinitionComponent } from './savings-bank-product-definition/add-sb-product-definition/add-sb-product-definition.component';
import { GeneralConfigComponent } from './savings-bank-product-definition/add-sb-product-definition/general-config/general-config.component';
import { InterestPolicyComponent } from './savings-bank-product-definition/add-sb-product-definition/interest-policy/interest-policy.component';
import { TransactionLimitConfigComponent } from './savings-bank-product-definition/add-sb-product-definition/transaction-limit-config/transaction-limit-config.component';
import { ServiceChargesComponent } from './savings-bank-product-definition/add-sb-product-definition/service-charges/service-charges.component';
import { RequiredDocumentsComponent } from './savings-bank-product-definition/add-sb-product-definition/required-documents/required-documents.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { MembershipBasicRequiredDetailsComponent } from './savings-bank-account-creation-stepper/membership-basic-required-details/membership-basic-required-details.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { FileUploadModule } from 'primeng/fileupload';
import { ErpInterceptor } from 'src/app/shared/erpInterceptor';
import { NewMembershipComponent } from './savings-bank-account-creation-stepper/new-membership/new-membership.component';
import { SbRequiredDocumentsComponent } from './savings-bank-account-creation-stepper/required-documents/sb-required-documents.component';
import { ViewSbProductDefinitionComponent } from './savings-bank-product-definition/view-sb-product-definition/view-sb-product-definition.component';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    SavingsBankTranscationComponent,
    SavingsBankAccountCreationStepperComponent,
    SavingsBankApplicationComponent,
    SavingsBankCommunicationComponent,
    SavingsBankJointAccountComponent,
    SavingsBankKycComponent,
    SavingsBankNomineeComponent,
    SavingsBankServicesComponent,
    SbTransactionsComponent,
    StandingInstructionComponent,
    AmountBlockComponent,
    ChequebookIssueComponent,
    ClosureComponent,
    DeathClaimComponent,
    AccountServiceComponent,
    DebitcardIssueComponent,
    ViewSavingsBankComponent,
    SavingsBankProductDefinitionComponent,
    AddSbProductDefinitionComponent,
    GeneralConfigComponent,
    InterestPolicyComponent,
    TransactionLimitConfigComponent,
    ServiceChargesComponent,
    RequiredDocumentsComponent,
    SbRequiredDocumentsComponent,
    MembershipBasicRequiredDetailsComponent,
    NewMembershipComponent,
    ViewSbProductDefinitionComponent
  ],
  imports: [
    CommonModule,
    SavingsBankTranscationRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    ChipsModule,
    DialogModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    // MessagesModule,
    MessageModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
  
   HttpClientModule
  ]
  , 
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    ConfirmationService,
    MessageService,
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:   ErpInterceptor,
      multi: true
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
    // NO_ERRORS_SCHEMA
]
  
})
export class SavingsBankTranscationModule { }
