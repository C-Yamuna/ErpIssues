import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermDepositsTranscationRoutingModule } from './term-deposits-transcation-routing.module';
import { TermDepositsTranscationComponent } from './term-deposits-transcation.component';
import { InterestPaymentComponent } from './operations/interest-payment/interest-payment.component';
import { ForeclosureComponent } from './operations/foreclosure/foreclosure.component';
import { RenewalComponent } from './operations/renewal/renewal.component';
import { ClosureComponent } from './operations/closure/closure.component';

import { FdCumulativeComponent } from './fd-cumulative/fd-cumulative.component';
import { FdCumulativeStepperComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-stepper.component';
import { FdCumulativeProductComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-product/fd-cumulative-product.component';
import { FdCumulativeJointHolderDetailsComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-joint-holder-details/fd-cumulative-joint-holder-details.component';
import { FdCumulativeNomineeComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-nominee/fd-cumulative-nominee.component';
import { FdNonCumulativeComponent } from './fd-non-cumulative/fd-non-cumulative.component';
import { FdNonCumulativeStepperComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-stepper.component';
import { FdNonCumulativeJointHolderDetailsComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-joint-holder-details/fd-non-cumulative-joint-holder-details.component';
import { FdNonCumulativeNomineeComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-nominee/fd-non-cumulative-nominee.component';
import { RecurringDepositComponent } from './recurring-deposit/recurring-deposit.component';
import { RecurringDepositStepperComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-stepper.component';
import { RecurringDepositProductComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-product/recurring-deposit-product.component';
import { RecurringDepositJointHolderDetailsComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-joint-holder-details/recurring-deposit-joint-holder-details.component';
import { RecurringDepositNomineeComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-nominee/recurring-deposit-nominee.component';
import { TermDepositProductDefinitionComponent } from './term-deposit-product-definition/term-deposit-product-definition.component';
import { AddTdProductDefinitionComponent } from './term-deposit-product-definition/add-td-product-definition/add-td-product-definition.component';
import { GeneralConfigComponent } from './term-deposit-product-definition/add-td-product-definition/general-config/general-config.component';
import { InterestPolicyComponent } from './term-deposit-product-definition/add-td-product-definition/interest-policy/interest-policy.component';
import { PenalityConfigComponent } from './term-deposit-product-definition/add-td-product-definition/penality-config/penality-config.component';
import { RequiredDocumentsComponent } from './term-deposit-product-definition/add-td-product-definition/required-documents/required-documents.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { RecurringDepositKycComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-kyc/recurring-deposit-kyc.component';
import { RecurringDepositNewMemberComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-new-member/recurring-deposit-new-member.component';
import { RecurringDepositCommunicationComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-communication/recurring-deposit-communication.component';
import { FdNonCumulativeApplicationComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-application/fd-non-cumulative-application.component';
import { FdCumulativeApplicationComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-application/fd-cumulative-application.component';

import { NewMembershipAddComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/new-membership-add/new-membership-add.component';
import { FdNonCumulativeKycComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-kyc/fd-non-cumulative-kyc.component';
import { FdNonCumulativeCommunicationComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-communication/fd-non-cumulative-communication.component';
import { MembershipDetailsComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/membership-details/membership-details.component';

import { NewMembershipAddFdComponent } from './fd-cumulative/fd-cumulative-stepper/new-membership-add/new-membership-add.component';
import { FdCumulativeKycComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-kyc/fd-cumulative-kyc.component';
import { FdCumulativeCommunicationComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-communication/fd-cumulative-communication.component';
import { MembershipDetailComponent } from './fd-cumulative/fd-cumulative-stepper/membership-details/membership-details.component';


import { MessageModule } from 'primeng/message';
import { ViewFdCummulativeProductDefinitionComponent } from './term-deposit-product-definition/view-fd-cummulative-product-definition/view-fd-cummulative-product-definition.component';
import { RdRequireDocumentsComponent } from './recurring-deposit/recurring-deposit-stepper/rd-require-documents/rd-require-documents.component';
import { FdNonCumulativePreviewComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-preview/fd-non-cumulative-preview.component';
import { FdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/fd-non-cumulative-product-definition.component';
import { AddFdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition.component';
import { ViewFdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/view-fd-non-cumulative-product-definition/view-fd-non-cumulative-product-definition.component';
import { FdNonCumulativeGeneralConfigComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-general-config/fd-non-cumulative-general-config.component';
import { FdNonCumulativeInterestPolicyComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-interest-policy/fd-non-cumulative-interest-policy.component';
import { FdNonCumulativeRequiredDocumentsComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-required-documents/fd-non-cumulative-required-documents.component';
import { RecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/recurring-deposit-product-definition.component';
import { ViewRecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/view-recurring-deposit-product-definition/view-recurring-deposit-product-definition.component';
import { AddRecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/add-recurring-deposit-product-definition.component';
import { RecurringDepositRequiredDocumentsComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-required-documents/recurring-deposit-required-documents.component';
import { RecurringDepositPenalityConfigComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-penality-config/recurring-deposit-penality-config.component';
import { RecurringDepositInterestPolicyComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-interest-policy/recurring-deposit-interest-policy.component';
import { RecurringDepositGeneralConfigComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-general-config/recurring-deposit-general-config.component';
import { RdPreviewComponent } from './recurring-deposit/recurring-deposit-stepper/rd-preview/rd-preview.component';

import { FdCumulativePreviewComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-preview/fd-cumulative-preview.component';
import { RdMembershipDetailsComponent } from './recurring-deposit/recurring-deposit-stepper/rd-membership-details/rd-membership-details.component';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    TermDepositsTranscationComponent,
    InterestPaymentComponent,
    ForeclosureComponent,
    ClosureComponent,
    RenewalComponent,
    FdCumulativeComponent,
    FdCumulativeStepperComponent,
    FdCumulativeProductComponent,
    FdCumulativeJointHolderDetailsComponent,
    FdCumulativeNomineeComponent,
    FdNonCumulativeComponent,
    FdNonCumulativeStepperComponent,
    FdNonCumulativeJointHolderDetailsComponent,
    FdNonCumulativeNomineeComponent,
    RecurringDepositComponent,
    RecurringDepositStepperComponent,
    RecurringDepositProductComponent,
    RecurringDepositJointHolderDetailsComponent,
    RecurringDepositNomineeComponent,
    TermDepositProductDefinitionComponent,
    AddTdProductDefinitionComponent,
    GeneralConfigComponent,
    InterestPolicyComponent,
    PenalityConfigComponent,
    RequiredDocumentsComponent,
    RecurringDepositKycComponent,
    RecurringDepositNewMemberComponent,
    RecurringDepositCommunicationComponent,
    FdNonCumulativeApplicationComponent,
    FdCumulativeApplicationComponent,
    MembershipDetailComponent,
    FdCumulativeCommunicationComponent,
    FdCumulativePreviewComponent,
    FdCumulativeKycComponent,
    NewMembershipAddFdComponent,
    NewMembershipAddComponent,
    FdNonCumulativeKycComponent,
    FdNonCumulativeCommunicationComponent,
    MembershipDetailsComponent,
    ViewFdCummulativeProductDefinitionComponent,
    RdRequireDocumentsComponent,
    FdNonCumulativePreviewComponent,
    FdNonCumulativeProductDefinitionComponent,
    AddFdNonCumulativeProductDefinitionComponent,
    ViewFdNonCumulativeProductDefinitionComponent,
    FdNonCumulativeGeneralConfigComponent,
    FdNonCumulativeInterestPolicyComponent,
    FdNonCumulativeRequiredDocumentsComponent,
    RecurringDepositProductDefinitionComponent,
    ViewRecurringDepositProductDefinitionComponent,
    AddRecurringDepositProductDefinitionComponent,
    RecurringDepositRequiredDocumentsComponent,
    RecurringDepositPenalityConfigComponent,
    RecurringDepositInterestPolicyComponent,
    RecurringDepositGeneralConfigComponent,
    RdPreviewComponent,
    FdCumulativePreviewComponent,
    RdMembershipDetailsComponent
  ],
  imports: [
    CommonModule,
    TermDepositsTranscationRoutingModule,
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
   HttpClientModule
  ]
    
    
  
})
export class TermDepositsTranscationModule { }
