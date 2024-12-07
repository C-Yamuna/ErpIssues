import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavingsBankTranscationComponent } from './savings-bank-transcation.component';
import { SbTransactionsComponent } from './sb-transactions/sb-transactions.component';
import { StandingInstructionComponent } from './sb-operations/standing-instruction/standing-instruction.component';
import { AccountServiceComponent } from './sb-operations/account-service/account-service.component';
import { AmountBlockComponent } from './sb-operations/amount-block/amount-block.component';
import { ChequebookIssueComponent } from './sb-operations/chequebook-issue/chequebook-issue.component';
import { DebitcardIssueComponent } from './sb-operations/debitcard-issue/debitcard-issue.component';
import { ClosureComponent } from './sb-operations/closure/closure.component';
import { DeathClaimComponent } from './sb-operations/death-claim/death-claim.component';
import { ViewSavingsBankComponent } from './view-savings-bank/view-savings-bank.component';
import { AddSbProductDefinitionComponent } from './savings-bank-product-definition/add-sb-product-definition/add-sb-product-definition.component';
import { GeneralConfigComponent } from './savings-bank-product-definition/add-sb-product-definition/general-config/general-config.component';
import { InterestPolicyComponent } from './savings-bank-product-definition/add-sb-product-definition/interest-policy/interest-policy.component';
import { TransactionLimitConfigComponent } from './savings-bank-product-definition/add-sb-product-definition/transaction-limit-config/transaction-limit-config.component';
import { ServiceChargesComponent } from './savings-bank-product-definition/add-sb-product-definition/service-charges/service-charges.component';
import { RequiredDocumentsComponent } from './savings-bank-product-definition/add-sb-product-definition/required-documents/required-documents.component';
import { SavingsBankAccountCreationStepperComponent } from './savings-bank-account-creation-stepper/savings-bank-account-creation-stepper.component';
import { SavingsBankApplicationComponent } from './savings-bank-account-creation-stepper/savings-bank-application/savings-bank-application.component';
import { SavingsBankJointAccountComponent } from './savings-bank-account-creation-stepper/savings-bank-joint-account/savings-bank-joint-account.component';
import { SavingsBankCommunicationComponent } from './savings-bank-account-creation-stepper/savings-bank-communication/savings-bank-communication.component';
import { SavingsBankKycComponent } from './savings-bank-account-creation-stepper/savings-bank-kyc/savings-bank-kyc.component';
import { SavingsBankNomineeComponent } from './savings-bank-account-creation-stepper/savings-bank-nominee/savings-bank-nominee.component';
import { SavingsBankServicesComponent } from './savings-bank-account-creation-stepper/savings-bank-services/savings-bank-services.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { SavingsBankProductDefinitionComponent } from './savings-bank-product-definition/savings-bank-product-definition.component';
import { MembershipBasicRequiredDetailsComponent } from './savings-bank-account-creation-stepper/membership-basic-required-details/membership-basic-required-details.component';
import { NewMembershipComponent } from './savings-bank-account-creation-stepper/new-membership/new-membership.component';
import { SbRequiredDocumentsComponent } from './savings-bank-account-creation-stepper/required-documents/sb-required-documents.component';
import { ViewSbProductDefinitionComponent } from './savings-bank-product-definition/view-sb-product-definition/view-sb-product-definition.component';
const routes: Routes = [
  {
    path: '', component: TransactionsComponent,
    children: [
      {path: 'savings_bank_transaction', component: SavingsBankTranscationComponent},
      { path: 'sb_transactions', component: SbTransactionsComponent },
      { path: 'standing_instruction', component:StandingInstructionComponent},
      { path: 'account_service', component: AccountServiceComponent },
      { path: 'amount_block', component: AmountBlockComponent },
      { path: 'chequebook_issue', component: ChequebookIssueComponent },
      { path: 'debitcard_issue', component: DebitcardIssueComponent },
      { path: 'closure', component: ClosureComponent },
      { path: 'death_claim', component: DeathClaimComponent },
      { path: 'view_savings_bank',component:ViewSavingsBankComponent},
      { path: 'sb_product_definition',component:SavingsBankProductDefinitionComponent},
      
      {
        path: 'add_sb_product_definition', component:AddSbProductDefinitionComponent,
        children: [
          { path: 'general_configuration', component:GeneralConfigComponent },
          { path: 'interest_policy', component: InterestPolicyComponent},
          { path: 'transaction_limit_config', component: TransactionLimitConfigComponent },
          { path: 'service_charges', component: ServiceChargesComponent },
          { path: 'required_documents', component: RequiredDocumentsComponent },
         
        ]
      },
      {
        path: 'account_creation_stepper', component:SavingsBankAccountCreationStepperComponent,
        children: [
          { path: 'membership_basic_details',component:MembershipBasicRequiredDetailsComponent},
          { path: 'sb_application', component:SavingsBankApplicationComponent },
          { path: 'sb_jointAccount', component: SavingsBankJointAccountComponent},
          { path: 'sb_communication', component: SavingsBankCommunicationComponent },
          { path: 'sb_kyc', component: SavingsBankKycComponent },
          { path: 'sb_nominee', component: SavingsBankNomineeComponent },
          { path: 'sb_services', component: SavingsBankServicesComponent },
          { path: 'new_membership', component: NewMembershipComponent },
          { path: 'sb_required_documents', component: SbRequiredDocumentsComponent },
        ]
      },
      { path: 'view_sb_product_definition',component:ViewSbProductDefinitionComponent},
    ]
  },
  

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingsBankTranscationRoutingModule { }
