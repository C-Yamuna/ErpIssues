import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InvestmentsTransactionRoutingModule } from './investments-transaction-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { InvestmentsTransactionComponent } from './investments-transaction.component';
import { ViewInvestmentsTransactionComponent } from './view-investments-transaction/view-investments-transaction.component';
import { InvestmentsInterestPaymentComponent } from './investments-operations/investments-interest-payment/investments-interest-payment.component';
import { InvestmentsForeclosureComponent } from './investments-operations/investments-foreclosure/investments-foreclosure.component';
import { InvestmentsClosureComponent } from './investments-operations/investments-closure/investments-closure.component';
import { DepositInvestmentsComponent } from './deposit-investments/deposit-investments.component';
import { SharesInvestmentsComponent } from './shares-investments/shares-investments.component';
import { InvestmentAccountDocumentsComponent } from './deposit-investments/investment-account-documents/investment-account-documents.component';
import { InvestmentsApplicationDetailsComponent } from './deposit-investments/investments-application-details/investments-application-details.component';
import { ViewSharesInvestmentsComponent } from './view-shares-investments/view-shares-investments.component';
import { InvestmentsProductDefinitionComponent } from './investments-product-definition/investments-product-definition.component';
import { ViewInvestmentsProductDefinitionComponent } from './investments-product-definition/view-investments-product-definition/view-investments-product-definition.component';
import { ProductComponent } from './investments-product-definition/add-investments-product-definition/product/product.component';
import { AssociatedBankDetailsComponent } from './investments-product-definition/add-investments-product-definition/associated-bank-details/associated-bank-details.component';
import { InterestPolicyComponent } from './investments-product-definition/add-investments-product-definition/interest-policy/interest-policy.component';
import { RequiredDocumentsComponent } from './investments-product-definition/add-investments-product-definition/required-documents/required-documents.component';
import { AddInvestmentsProductDefinitionComponent } from './investments-product-definition/add-investments-product-definition/add-investments-product-definition.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    InvestmentsTransactionComponent, 
    InvestmentsApplicationDetailsComponent,
    InvestmentAccountDocumentsComponent, 
    ViewInvestmentsTransactionComponent,
    InvestmentsInterestPaymentComponent,
    InvestmentsForeclosureComponent,
    InvestmentsClosureComponent,
    DepositInvestmentsComponent,
    SharesInvestmentsComponent,
    ViewSharesInvestmentsComponent,
    InvestmentsProductDefinitionComponent,
    AddInvestmentsProductDefinitionComponent,
    ViewInvestmentsProductDefinitionComponent,
    ProductComponent,
    AssociatedBankDetailsComponent,
    InterestPolicyComponent,
    RequiredDocumentsComponent
  ],
  imports: [
    CommonModule,
    InvestmentsTransactionRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    TranslateModule,
    HttpClientModule,
    MessageModule
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class InvestmentsTransactionModule { }
