import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient,HttpClientModule } from '@angular/common/http';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { CashCounterTransactionRoutingModule } from './cash-counter-transaction-routing.module';
import { CashCounterTransactionComponent } from './cash-counter-transaction.component';
import { AddCashCounterTransactionComponent } from './add-cash-counter-transaction/add-cash-counter-transaction.component';
import { ViewCashCounterComponent } from './view-cash-counter/view-cash-counter.component';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
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
import { CounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/counterwise-difference-amount.component';
import { AddCounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/add-counterwise-difference-amount/add-counterwise-difference-amount.component';
import { ViewCounterwiseDifferenceAmountComponent } from './counterwise-difference-amount/view-counterwise-difference-amount/view-counterwise-difference-amount.component';
import { DamageOrFakeNotesComponent } from './damage-or-fake-notes/damage-or-fake-notes.component';
import { AddDamageOrFakeNotesComponent } from './damage-or-fake-notes/add-damage-or-fake-notes/add-damage-or-fake-notes.component';
import { ViewDamageOrFakeNotesComponent } from './damage-or-fake-notes/view-damage-or-fake-notes/view-damage-or-fake-notes.component';
import { VaultCashComponent } from './vault-cash/vault-cash.component';
import { ViewVaultCashComponent } from './vault-cash/view-vault-cash/view-vault-cash.component';
import { CounterDenominationComponent } from './counter-denomination/counter-denomination.component';
import { CashierScrollComponent } from './cashier-scroll/cashier-scroll.component';

@NgModule({
  declarations: [
    CashCounterTransactionComponent,
    AddCashCounterTransactionComponent,
    ViewCashCounterComponent,
    VaultCreationTransactionComponent,
    AddVaultCreationComponent,
    ViewVaultCreationComponent,
    BranchToBranchTransationComponent,
    AddBranchToBranchTransactionComponent,
    ViewBranchToBranchTransactionComponent,
    VaultTransactionAndUserAssignmentComponent,
    AddVaultTransactionAndUserAssignmentComponent,
    ViewVaultTransactionAndUserAssignmentComponent,
    VaultToDccbTransactionComponent,
    AddVaultToDccbTransactionComponent,
    ViewVaultToDccbTransactionComponent,
    ExchangeComponent,
    AddExchangeComponent,
    ViewExchangeComponent,
    CounterwiseDifferenceAmountComponent,
    AddCounterwiseDifferenceAmountComponent,
    ViewCounterwiseDifferenceAmountComponent,
    DamageOrFakeNotesComponent,
    AddDamageOrFakeNotesComponent,
    ViewDamageOrFakeNotesComponent,
    VaultCashComponent,
    ViewVaultCashComponent,
    CounterDenominationComponent,
    CashierScrollComponent
  ],
  imports: [
    CommonModule,
    CashCounterTransactionRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
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
  ],
  providers:[
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
  
})
export class CashCounterTransactionModule { }
