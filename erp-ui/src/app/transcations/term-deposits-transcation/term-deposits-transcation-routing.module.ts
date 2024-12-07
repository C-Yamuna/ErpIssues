import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermDepositConfigComponent } from 'src/app/configurations/term-deposit-config/term-deposit-config.component';
import { TermDepositsTranscationComponent } from './term-deposits-transcation.component';
import { InterestPaymentComponent } from './operations/interest-payment/interest-payment.component';
import { ForeclosureComponent } from './operations/foreclosure/foreclosure.component';
import { ClosureComponent } from './operations/closure/closure.component';
import { RenewalComponent } from './operations/renewal/renewal.component';
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
import { TransactionsComponent } from '../transactions/transactions.component';
import { RecurringDepositNewMemberComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-new-member/recurring-deposit-new-member.component';
import { RecurringDepositCommunicationComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-communication/recurring-deposit-communication.component';
import { RecurringDepositKycComponent } from './recurring-deposit/recurring-deposit-stepper/recurring-deposit-kyc/recurring-deposit-kyc.component';
import { MembershipDetailsComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/membership-details/membership-details.component';
import { FdNonCumulativeKycComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-kyc/fd-non-cumulative-kyc.component';
import { FdNonCumulativeCommunicationComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-communication/fd-non-cumulative-communication.component';
import { FdNonCumulativeApplicationComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-application/fd-non-cumulative-application.component';
import { NewMembershipAddComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/new-membership-add/new-membership-add.component';
import { ViewFdCummulativeProductDefinitionComponent } from './term-deposit-product-definition/view-fd-cummulative-product-definition/view-fd-cummulative-product-definition.component';
import { RdRequireDocumentsComponent } from './recurring-deposit/recurring-deposit-stepper/rd-require-documents/rd-require-documents.component';
import { FdNonCumulativePreviewComponent } from './fd-non-cumulative/fd-non-cumulative-stepper/fd-non-cumulative-preview/fd-non-cumulative-preview.component';
import { FdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/fd-non-cumulative-product-definition.component';
import { ViewFdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/view-fd-non-cumulative-product-definition/view-fd-non-cumulative-product-definition.component';
import { AddFdNonCumulativeProductDefinitionComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition.component';
import { FdNonCumulativeGeneralConfigComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-general-config/fd-non-cumulative-general-config.component';
import { FdNonCumulativeInterestPolicyComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-interest-policy/fd-non-cumulative-interest-policy.component';
import { FdNonCumulativeRequiredDocumentsComponent } from './fd-non-cumulative-product-definition/add-fd-non-cumulative-product-definition/fd-non-cumulative-required-documents/fd-non-cumulative-required-documents.component';
import { RecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/recurring-deposit-product-definition.component';
import { ViewRecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/view-recurring-deposit-product-definition/view-recurring-deposit-product-definition.component';
import { AddRecurringDepositProductDefinitionComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/add-recurring-deposit-product-definition.component';
import { RecurringDepositGeneralConfigComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-general-config/recurring-deposit-general-config.component';
import { RecurringDepositInterestPolicyComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-interest-policy/recurring-deposit-interest-policy.component';
import { RecurringDepositRequiredDocumentsComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-required-documents/recurring-deposit-required-documents.component';
import { RecurringDepositPenalityConfigComponent } from './recurring-deposit-product-definition/add-recurring-deposit-product-definition/recurring-deposit-penality-config/recurring-deposit-penality-config.component';
import { FdCumulativeApplicationComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-application/fd-cumulative-application.component';
import { FdCumulativeCommunicationComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-communication/fd-cumulative-communication.component';
import { NewMembershipAddFdComponent } from './fd-cumulative/fd-cumulative-stepper/new-membership-add/new-membership-add.component';
import { MembershipDetailComponent } from './fd-cumulative/fd-cumulative-stepper/membership-details/membership-details.component';
import { FdCumulativeKycComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-kyc/fd-cumulative-kyc.component';
import { FdCumulativePreviewComponent } from './fd-cumulative/fd-cumulative-stepper/fd-cumulative-preview/fd-cumulative-preview.component';
import { RdPreviewComponent } from './recurring-deposit/recurring-deposit-stepper/rd-preview/rd-preview.component';
import { RdMembershipDetailsComponent } from './recurring-deposit/recurring-deposit-stepper/rd-membership-details/rd-membership-details.component';


const routes: Routes = [
  {
    path: '', component: TransactionsComponent,
    children: [
      { path: 'term_deposits', component: TermDepositsTranscationComponent },
      { path: 'fd_non_cummulative', component: FdNonCumulativeComponent },
      { path: 'fd_cummulative', component: FdCumulativeComponent },
      { path: 'reccuring_deposits', component: RecurringDepositComponent },
      { path: 'interest_payment', component: InterestPaymentComponent },
      { path: 'fore_closure', component: ForeclosureComponent },
      { path: 'closure', component: ClosureComponent },
      { path: 'renewal', component: RenewalComponent },
      { path: 'term_deposit_product_definition', component: TermDepositProductDefinitionComponent },
      { path: 'view_fd_cummulative_product_definition', component: ViewFdCummulativeProductDefinitionComponent },
      { path: 'fd_non_cumulative_preview', component: FdNonCumulativePreviewComponent },
      { path: 'fd_cumulative_preview', component: FdCumulativePreviewComponent },
      { path: 'rd_preview', component:  RdPreviewComponent },

      {
        path: 'add_td_product_definition', component: AddTdProductDefinitionComponent,
        children: [
          { path: 'general_config', component: GeneralConfigComponent },
          { path: 'interest_policy', component: InterestPolicyComponent },
          { path: 'penality_config', component: PenalityConfigComponent },
          { path: 'required_documents', component: RequiredDocumentsComponent },
        ]
      },
      {
        path: 'fd_non_cumulative_stepper', component: FdNonCumulativeStepperComponent,
        children: [
          { path: 'membership',component: MembershipDetailsComponent},
          { path: 'new_membership', component: NewMembershipAddComponent },
          { path: 'fd_non_cumm_application', component: FdNonCumulativeApplicationComponent },
          { path: 'communication', component: FdNonCumulativeCommunicationComponent },
          { path: 'kyc_details', component: FdNonCumulativeKycComponent },
          { path: 'joint_account', component: FdNonCumulativeJointHolderDetailsComponent},
          { path: 'nominee', component: FdNonCumulativeNomineeComponent },
        ]
      },
      {
        path: 'fd_cumulative_stepper', component: FdCumulativeStepperComponent,
        children: [
          { path: 'fd_cumulative_product', component: FdCumulativeProductComponent },
          { path: 'fd_cumulative_joint_holder_details', component: FdCumulativeJointHolderDetailsComponent },
          { path: 'fd_cumulative_nominee', component: FdCumulativeNomineeComponent },
          { path: 'membership',component: MembershipDetailComponent},
          { path: 'kyc_details', component: FdCumulativeKycComponent },
          { path: 'new_membership', component: NewMembershipAddFdComponent },
          { path: 'fd_cumulative_application', component: FdCumulativeApplicationComponent },
          { path: 'communication', component: FdCumulativeCommunicationComponent },
        ]
      },
      {
        path: 'recurring_deposit_stepper', component: RecurringDepositStepperComponent,
        children: [
          { path: 'recurring_deposit_membership_details', component: RdMembershipDetailsComponent },
          { path: 'recurring_deposit_product', component: RecurringDepositProductComponent },
          { path: 'recurring_deposit_joint_holder_details', component: RecurringDepositJointHolderDetailsComponent },
          { path: 'recurring_deposit_nominee', component: RecurringDepositNomineeComponent },
          { path: 'recurring_deposit_kyc', component: RecurringDepositKycComponent },
          { path: 'recurring_deposit_communication', component: RecurringDepositCommunicationComponent },
          { path: 'recurring_deposit_add_member', component: RecurringDepositNewMemberComponent },
          { path: 'required_documents', component: RdRequireDocumentsComponent },
        ]
      },
      { path: 'fd_non_cummulative_product_definition', component: FdNonCumulativeProductDefinitionComponent },
      { path: 'view_fd_non_cummulative_product_definition', component: ViewFdNonCumulativeProductDefinitionComponent },
      {
        path: 'add_fd_non_cumulative_product_definition', component: AddFdNonCumulativeProductDefinitionComponent,
        children: [
          { path: 'general_config', component: FdNonCumulativeGeneralConfigComponent },
          { path: 'interest_policy', component: FdNonCumulativeInterestPolicyComponent },
          { path: 'required_documents', component: FdNonCumulativeRequiredDocumentsComponent },
        ]
      },


      { path: 'recurring_deposit_product_definition', component: RecurringDepositProductDefinitionComponent },
      { path: 'view_recurring_deposit_product_definition', component: ViewRecurringDepositProductDefinitionComponent },
      {
        path: 'add_recurring_deposit_product_definition', component: AddRecurringDepositProductDefinitionComponent,
        children: [
          { path: 'general_config', component: RecurringDepositGeneralConfigComponent },
          { path: 'interest_policy', component: RecurringDepositInterestPolicyComponent },
          { path: 'required_documents', component: RecurringDepositRequiredDocumentsComponent },
          { path: 'penality_config', component: RecurringDepositPenalityConfigComponent },
        ]
      },



    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermDepositsTranscationRoutingModule {

}
