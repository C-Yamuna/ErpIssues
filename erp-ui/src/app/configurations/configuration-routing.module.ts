import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  {path:' ', component: ConfigurationComponent },
  { path: 'common_config', loadChildren: () => import('./common-config/common-config.module').then(m => m.CommonConfigModule)},
  { path: 'loan_config', loadChildren: () => import('./loan-config/loan-config.module').then(m => m.LoanConfigModule)},
  { path: 'membership_config', loadChildren: () => import('./membership-config/membership-config.module').then(m => m.MembershipConfigModule)},
  { path: 'savings_bank_config', loadChildren: () => import('./sb-config/sb-config.module').then(m => m.SbConfigModule)},
  { path: 'term_deposit_config', loadChildren: () => import('./term-deposit-config/term-deposit-config.module').then(m => m.TermDepositConfigModule)},
  { path: 'cashier_config', loadChildren: () => import('./cashier-config/cashier-config.module').then(m => m.cashierConfigModule)},
  { path: 'agent_details_config',loadChildren: () => import('./agent-details-config/agent-details-config.module').then(m => m.AgentDetailsConfigModule) },
  { path: 'borrowing_config',loadChildren: () => import('./borrowing-config/borrowing-config.module').then(m => m.BorrowingConfigModule) },
  { path: 'investments_config',loadChildren: () => import('./investments-config/investments-config.module').then(m => m.InvestmentsConfigModule) },
  { path: 'daily_deposits_config',loadChildren: () => import('./daily-deposits-config/daily-deposits-config.module').then(m => m.DailyDepositsConfigModule) },
  { path: 'locker_config',loadChildren: () => import('./locker-config/locker-config.module').then(m => m.LockerConfigModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
