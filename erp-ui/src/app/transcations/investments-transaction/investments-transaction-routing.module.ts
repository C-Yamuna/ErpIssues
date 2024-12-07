import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { InvestmentsTransactionComponent } from './investments-transaction.component';
import { ViewInvestmentsTransactionComponent } from './view-investments-transaction/view-investments-transaction.component';
import { InvestmentsInterestPaymentComponent } from './investments-operations/investments-interest-payment/investments-interest-payment.component';
import { InvestmentsForeclosureComponent } from './investments-operations/investments-foreclosure/investments-foreclosure.component';
import { InvestmentsClosureComponent } from './investments-operations/investments-closure/investments-closure.component';
import { DepositInvestmentsComponent } from './deposit-investments/deposit-investments.component';
import { InvestmentsApplicationDetailsComponent } from './deposit-investments/investments-application-details/investments-application-details.component';
import { InvestmentAccountDocumentsComponent } from './deposit-investments/investment-account-documents/investment-account-documents.component';
import { SharesInvestmentsComponent } from './shares-investments/shares-investments.component';
import { ViewSharesInvestmentsComponent } from './view-shares-investments/view-shares-investments.component';
import { InvestmentsProductDefinitionComponent } from './investments-product-definition/investments-product-definition.component';
import { AddInvestmentsProductDefinitionComponent } from './investments-product-definition/add-investments-product-definition/add-investments-product-definition.component';
import { ViewInvestmentsProductDefinitionComponent } from './investments-product-definition/view-investments-product-definition/view-investments-product-definition.component';
import { ProductComponent } from './investments-product-definition/add-investments-product-definition/product/product.component';
import { AssociatedBankDetailsComponent } from './investments-product-definition/add-investments-product-definition/associated-bank-details/associated-bank-details.component';
import { InterestPolicyComponent } from './investments-product-definition/add-investments-product-definition/interest-policy/interest-policy.component';
import { RequiredDocumentsComponent } from './investments-product-definition/add-investments-product-definition/required-documents/required-documents.component';


const routes: Routes = [
  {
    path: '', component:TransactionsComponent,
    children: [

      {path: 'investments_transaction', component:InvestmentsTransactionComponent},

      {path: 'view_investments_transaction', component:ViewInvestmentsTransactionComponent},

      {path: 'view_shares_investments', component:ViewSharesInvestmentsComponent},

      {
        path: 'deposit_investments', component:DepositInvestmentsComponent,
        
        children: [
          
          { path: 'investments_application_details', component:InvestmentsApplicationDetailsComponent },
          
          { path: 'investments_account_documents', component: InvestmentAccountDocumentsComponent},

        ]
      },

      {path: 'shares_investments', component:SharesInvestmentsComponent},
      
      { path: 'investments_interest_payment', component:InvestmentsInterestPaymentComponent },
          
      { path: 'investments_foreclosure', component: InvestmentsForeclosureComponent},

      { path: 'investments_closure', component: InvestmentsClosureComponent},

      { path: 'investments_product_definition', component: InvestmentsProductDefinitionComponent},

      { path: 'view_investments_product_definition', component: ViewInvestmentsProductDefinitionComponent},

      { path: 'add_investments_product_definition', component: AddInvestmentsProductDefinitionComponent,

        children: [
          
          { path: 'product', component:ProductComponent },
          
          { path: 'associated_bank_details', component: AssociatedBankDetailsComponent},

          { path: 'interest_policy', component: InterestPolicyComponent},

          { path: 'required_documents', component: RequiredDocumentsComponent},

        ]
      }

    ]
  }
]
      
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsTransactionRoutingModule { }
