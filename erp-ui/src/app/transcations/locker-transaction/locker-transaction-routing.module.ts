import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DailyDepositsConfigComponent } from 'src/app/configurations/daily-deposits-config/daily-deposits-config.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { LockerTransactionComponent } from './locker-transaction.component';



const routes: Routes = [
  {
    path: '', component: TransactionsComponent,
    children: [

      { path: 'locker_transaction', component: LockerTransactionComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockerTransactionRoutingModule { }
