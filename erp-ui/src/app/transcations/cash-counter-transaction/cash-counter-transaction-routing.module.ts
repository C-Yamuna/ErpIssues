import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { CashCounterTransactionComponent } from './cash-counter-transaction.component';
import { AddCashCounterTransactionComponent } from './add-cash-counter-transaction/add-cash-counter-transaction.component';
import { ViewCashCounterComponent } from './view-cash-counter/view-cash-counter.component';
import { VaultCreationTransactionComponent } from './vault-creation-transaction/vault-creation-transaction.component';
import { AddVaultCreationComponent } from './vault-creation-transaction/add-vault-creation/add-vault-creation.component';
import { ViewVaultCreationComponent } from './vault-creation-transaction/view-vault-creation/view-vault-creation.component';
import { BranchToBranchTransationComponent } from './branch-to-branch-transation/branch-to-branch-transation.component';
import { AddBranchToBranchTransactionComponent } from './branch-to-branch-transation/add-branch-to-branch-transaction/add-branch-to-branch-transaction.component';
import { ViewBranchToBranchTransactionComponent } from './branch-to-branch-transation/view-branch-to-branch-transaction/view-branch-to-branch-transaction.component';
import { VaultTransactionAndUserAssignmentComponent } from './vault-transaction-and-user-assignment/vault-transaction-and-user-assignment.component';
import { AddVaultTransactionAndUserAssignmentComponent } from './vault-transaction-and-user-assignment/add-vault-transaction-and-user-assignment/add-vault-transaction-and-user-assignment.component';
import { ViewVaultTransactionAndUserAssignmentComponent } from './vault-transaction-and-user-assignment/view-vault-transaction-and-user-assignment/view-vault-transaction-and-user-assignment.component';

import { VaultToDccbTransactionComponent } from './vault-to-dccb-transaction/vault-to-dccb-transaction.component';
import { AddVaultToDccbTransactionComponent } from './vault-to-dccb-transaction/add-vault-to-dccb-transaction/add-vault-to-dccb-transaction.component';
import { ViewVaultToDccbTransactionComponent } from './vault-to-dccb-transaction/view-vault-to-dccb-transaction/view-vault-to-dccb-transaction.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { AddExchangeComponent } from './exchange/add-exchange/add-exchange.component';
import { ViewExchangeComponent } from './exchange/view-exchange/view-exchange.component';
import { AddCounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/add-counterwise-difference-amount/add-counterwise-difference-amount.component';
import { ViewCounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/view-counterwise-difference-amount/view-counterwise-difference-amount.component';
import { CounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/counterwise-difference-amount.component';
import { DamageOrFakeNotesComponent } from './damage-or-fake-notes/damage-or-fake-notes.component';
import { AddDamageOrFakeNotesComponent } from './damage-or-fake-notes/add-damage-or-fake-notes/add-damage-or-fake-notes.component';
import { ViewDamageOrFakeNotesComponent } from './damage-or-fake-notes/view-damage-or-fake-notes/view-damage-or-fake-notes.component';
import { VaultCashComponent } from './vault-cash/vault-cash.component';
import { ViewVaultCashComponent } from './vault-cash/view-vault-cash/view-vault-cash.component';
import { CounterDenominationComponent } from './counter-denomination/counter-denomination.component';
import { CashierScrollComponent } from './cashier-scroll/cashier-scroll.component';
const routes: Routes = [
  {
    path: '', component:TransactionsComponent,
    children: [
      {path: 'cash_counter_transactions', component:CashCounterTransactionComponent},
      {path: 'add_cash_counter_transactions', component:AddCashCounterTransactionComponent},
      {path: 'view_cash_counter', component:ViewCashCounterComponent},
      {path: 'vault_creation_transaction', component:VaultCreationTransactionComponent},
      {path: 'add_vault_creation', component:AddVaultCreationComponent},
      {path: 'view_vault_creation', component:ViewVaultCreationComponent},
      {path: 'branch_to_branch_transaction', component:BranchToBranchTransationComponent},
      {path: 'add_branch_to_branch_transaction', component:AddBranchToBranchTransactionComponent},
      {path: 'view_branch_to_branch_transaction', component:ViewBranchToBranchTransactionComponent},
      {path: 'vault_transaction_and_user_assignment', component:VaultTransactionAndUserAssignmentComponent},
      {path: 'add_vault_transaction_and_user_assignment', component:AddVaultTransactionAndUserAssignmentComponent},
      {path: 'view_vault_transaction_and_user_assignment', component:ViewVaultTransactionAndUserAssignmentComponent},

      {path: 'vault_to_dccb_transaction', component:VaultToDccbTransactionComponent},
      {path: 'add_vault_to_dccb_transaction', component:AddVaultToDccbTransactionComponent},
      {path: 'view_vault_to_dccb_transaction', component:ViewVaultToDccbTransactionComponent},

      {path: 'exchange', component:ExchangeComponent},
      {path: 'add_exchange', component:AddExchangeComponent},
      {path: 'view_exchange', component:ViewExchangeComponent},

      {path: 'counterwise_difference_amount', component:CounterwiseDifferenceAmountComponent},
      {path: 'add_counterwise_difference_amount', component:AddCounterwiseDifferenceAmountComponent},
      {path: 'view_counterwise_difference_amount', component:ViewCounterwiseDifferenceAmountComponent},
  
      {path: 'damage_or_fake_notes', component:DamageOrFakeNotesComponent},
      {path: 'add_damage_or_fake_notes', component:AddDamageOrFakeNotesComponent},
      {path: 'view_damage_or_fake_notes', component:ViewDamageOrFakeNotesComponent},


      {path: 'vault_cash', component:VaultCashComponent},
      {path: 'view_vault_cash', component:ViewVaultCashComponent},
      {path: 'counter_denomination', component:CounterDenominationComponent},
      {path: 'cashier_scroll', component:CashierScrollComponent},
  
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashCounterTransactionRoutingModule { }
