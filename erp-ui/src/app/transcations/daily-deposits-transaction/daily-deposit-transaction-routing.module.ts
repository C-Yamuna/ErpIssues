import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { DailyDepositsConfigComponent } from 'src/app/configurations/daily-deposits-config/daily-deposits-config.component';
import { DailyDepositStepperComponent } from './daily-deposit-stepper/daily-deposit-stepper.component';
import { MembershipBasicDetailsComponent } from './daily-deposit-stepper/membership-basic-details/membership-basic-details.component';
import { NewMembershipComponent } from './daily-deposit-stepper/new-membership/new-membership.component';
import { ProductDetailsComponent } from './daily-deposit-stepper/product-details/product-details.component';
import { CommunicationComponent } from './daily-deposit-stepper/communication/communication.component';
import { KycComponent } from './daily-deposit-stepper/kyc/kyc.component';
import { NomineeComponent } from './daily-deposit-stepper/nominee/nominee.component';
import { ViewDailyDepositsComponent } from './view-daily-deposits/view-daily-deposits.component';
import { InstallmentChartsComponent } from './operations/installment-charts/installment-charts.component';
import { ForeclosureComponent } from '../term-deposits-transcation/operations/foreclosure/foreclosure.component';
import { ClosureComponent } from '../loan-transcation/operations/closure/closure.component';
import { DailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/daily-deposits-product-definition.component';
import { AddDailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/add-daily-deposits-product-definition.component';
import { ViewDailyDepositsProductDefinitionComponent } from './daily-deposits-product-definition/view-daily-deposits-product-definition/view-daily-deposits-product-definition.component';
import { GeneralConfigComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/general-config/general-config.component';
import { InterestPolicyComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/interest-policy/interest-policy.component';
import { PenalityConfigComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/penality-config/penality-config.component';
import { RequiredDocumentsComponent } from './daily-deposits-product-definition/add-daily-deposits-product-definition/required-documents/required-documents.component';

const routes: Routes = [
  {
    path: '', component: TransactionsComponent,
    children: [

      { path: 'daily_deposit_transactions', component: DailyDepositsConfigComponent },
      {
        path: 'daily_deposit_stepper', component: DailyDepositStepperComponent,
        children: [
          { path: 'membership_basic_details', component: MembershipBasicDetailsComponent },
          { path: 'new_membership', component: NewMembershipComponent },
          { path: 'daily_deposit_product_details', component: ProductDetailsComponent },
          { path: 'daily_deposit_communication', component: CommunicationComponent },
          { path: 'daily_deposit_kyc', component: KycComponent },
          { path: 'daily_deposit_nominee', component: NomineeComponent },
        ]
      },
      { path: 'view_daily_deposits', component: ViewDailyDepositsComponent },

      { path: 'installment_charts', component: InstallmentChartsComponent },
      { path: 'foreclosure', component: ForeclosureComponent },
      { path: 'closure', component: ClosureComponent },

      { path: 'daily_deposit_product_definition', component: DailyDepositsProductDefinitionComponent },

      { path: 'view_daily_deposit_product_definition', component: ViewDailyDepositsProductDefinitionComponent},

      { path: 'add_daily_deposit_product_definition', component: AddDailyDepositsProductDefinitionComponent ,

        children: [
          
          { path: 'general_config', component:GeneralConfigComponent },

          { path: 'interest_policy', component: InterestPolicyComponent},

          { path: 'penality_config', component: PenalityConfigComponent},

          { path: 'required_documents', component: RequiredDocumentsComponent},

        ]
       },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyDepositTransactionRoutingModule { }
