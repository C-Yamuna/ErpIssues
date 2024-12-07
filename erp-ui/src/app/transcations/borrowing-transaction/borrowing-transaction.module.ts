import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BorrowingTransactionComponent } from './borrowing-transaction.component';
import { BorrowingTransactionRoutingModule } from './borrowing-transaction-routing.module';
import { ViewBorrowingComponent } from './view-borrowing/view-borrowing.component';
import { EmiChartComponent } from './operations/emi-chart/emi-chart.component';
import { DisbursementComponent } from './operations/disbursement/disbursement.component';
import { CollectionComponent } from './operations/collection/collection.component';
import { ClosureComponent } from './operations/closure/closure.component';
import { ChargesCollectionComponent } from './operations/charges-collection/charges-collection.component';
import { SaoBorrowingComponent } from './sao-borrowing/sao-borrowing.component';
import { TermBorrowingComponent } from './term-borrowing/term-borrowing.component';
import { CiBorrowingComponent } from './ci-borrowing/ci-borrowing.component';
import { SiBorrowingComponent } from './si-borrowing/si-borrowing.component';
import { CiBorrowingStepperComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-stepper.component';
import { CiAccountDetailsComponent } from './ci-borrowing/ci-borrowing-stepper/ci-account-details/ci-account-details.component';
import { CiBorrowingAccountMappingComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-account-mapping/ci-borrowing-account-mapping.component';
import { CiBorrowingDocumentsComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-documents/ci-borrowing-documents.component';
import { CiViewBorrowingComponent } from './ci-borrowing/ci-view-borrowing/ci-view-borrowing.component';
import { SaoBorrowingStepperComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-stepper.component';
import { SaoBorrowingAccountMappingComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-account-mapping/sao-borrowing-account-mapping.component';
import { SaoBorrowingDocumentsComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-documents/sao-borrowing-documents.component';
import { SaoViewBorrowingComponent } from './sao-borrowing/sao-view-borrowing/sao-view-borrowing.component';
import { SaoAccountDetailsComponent } from './sao-borrowing/sao-borrowing-stepper/sao-account-details/sao-account-details.component';
import { SiBorrowingStepperComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-stepper.component';
import { SiAccountDetailsComponent } from './si-borrowing/si-borrowing-stepper/si-account-details/si-account-details.component';
import { SiBorrowingAccountMappingComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-account-mapping/si-borrowing-account-mapping.component';
import { SiBorrowingDocumentComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-document/si-borrowing-document.component';
import { SiViewBorrowingComponent } from './si-borrowing/si-view-borrowing/si-view-borrowing.component';
import { TermBorrowingStepperComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-stepper.component';
import { TermAccountDetailsComponent } from './term-borrowing/term-borrowing-stepper/term-account-details/term-account-details.component';
import { TermBorrowingAccountMappingComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-account-mapping/term-borrowing-account-mapping.component';
import { TermBorrowingDocumentComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-document/term-borrowing-document.component';
import { TermViewBorrowingComponent } from './term-borrowing/term-view-borrowing/term-view-borrowing.component';
import { SiDisbursementComponent } from './si-borrowing/si-operations/si-disbursement/si-disbursement.component';
import { SiCollectionComponent } from './si-borrowing/si-operations/si-collection/si-collection.component';
import { SiClosureComponent } from './si-borrowing/si-operations/si-closure/si-closure.component';
import { SiChargesCollectionComponent } from './si-borrowing/si-operations/si-charges-collection/si-charges-collection.component';
import { MessageModule } from 'primeng/message';
import { SaoBorrowingProductDefinitionComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition.component';
import { SaoBorrowingProductDefinitionStepperComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-borrowing-product-definition-stepper.component';
import { ViewSaoBorrowingProductDefinitionComponent } from './sao-borrowing/sao-borrowing-product-definition/view-sao-borrowing-product-definition/view-sao-borrowing-product-definition.component';
import { SaoProductConfigurationComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-product-configuration/sao-product-configuration.component';
import { SaoInterestPolicyConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-interest-policy-config/sao-interest-policy-config.component';
import { SaoLinkedShareCapitalComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-linked-share-capital/sao-linked-share-capital.component';
import { SaoChargesConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-charges-config/sao-charges-config.component';
import { SaoCollateralsComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-collaterals/sao-collaterals.component';
import { SaoPurposeConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-purpose-config/sao-purpose-config.component';
import { SaoRequiredDocumentsComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-required-documents/sao-required-documents.component';
import { SiBorrowingProductDefinitionComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition.component';
import { SiBorrowingProductDefinitionStepperComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-borrowing-product-definition-stepper.component';
import { ViewSiBorrowingProductDefinitionComponent } from './si-borrowing/si-borrowing-product-definition/view-si-borrowing-product-definition/view-si-borrowing-product-definition.component';
import { SiProductConfigComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-product-config/si-product-config.component';
import { SiInterestPolicyComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-interest-policy/si-interest-policy.component';
import { SiLinkedShareCapitalComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-linked-share-capital/si-linked-share-capital.component';
import { SiChargesComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-charges/si-charges.component';
import { SiPurposeComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-purpose/si-purpose.component';
import { SiRequiredDocumentsComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-required-documents/si-required-documents.component';
import { CiBorrowingProductDefinitionComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition.component';
import { ViewCiBorrowingProductDefinitionComponent } from './ci-borrowing/ci-borrowing-product-definition/view-ci-borrowing-product-definition/view-ci-borrowing-product-definition.component';
import { CiBorrowingProductDefinitionStepperComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-borrowing-product-definition-stepper.component';
import { CiProductConfigComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-product-config/ci-product-config.component';
import { CiInterestPolicyComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-interest-policy/ci-interest-policy.component';
import { CiLinkedShareCapitalComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-linked-share-capital/ci-linked-share-capital.component';
import { CiChargesComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-charges/ci-charges.component';
import { CiPurposeComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-purpose/ci-purpose.component';
import { CiRequiredDocumentsComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-required-documents/ci-required-documents.component';
import { TermBorrowingProductDefinitionComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition.component';
import { TermBorrowingProductDefinitionStepperComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-borrowing-product-definition-stepper.component';
import { ViewTermBorrowingProductDefinitionComponent } from './term-borrowing/term-borrowing-product-definition/view-term-borrowing-product-definition/view-term-borrowing-product-definition.component';
import { TermProductConfigComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-product-config/term-product-config.component';
import { TermInterestPolicyComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-interest-policy/term-interest-policy.component';
import { TermChargesComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-charges/term-charges.component';
import { TermPurposeComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-purpose/term-purpose.component';
import { TermRequiredDocumentsComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-required-documents/term-required-documents.component';
import { TermLinkedShareCapitalComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-linked-share-capital/term-linked-share-capital.component';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    BorrowingTransactionComponent,
    ViewBorrowingComponent,
    EmiChartComponent,
    DisbursementComponent,
    CollectionComponent,
    ClosureComponent,
    ChargesCollectionComponent,
    SaoBorrowingComponent,
    TermBorrowingComponent,
    CiBorrowingComponent,
    SiBorrowingComponent,
    CiBorrowingStepperComponent,
    CiAccountDetailsComponent,
    CiBorrowingAccountMappingComponent,
    CiBorrowingDocumentsComponent,
    CiViewBorrowingComponent,
    SaoBorrowingStepperComponent,
    SaoAccountDetailsComponent,
    SaoBorrowingAccountMappingComponent,
    SaoBorrowingDocumentsComponent,
    SaoViewBorrowingComponent,
    SiBorrowingStepperComponent,
    SiAccountDetailsComponent,
    SiBorrowingAccountMappingComponent,
    SiBorrowingDocumentComponent,
    SiViewBorrowingComponent,
    TermBorrowingStepperComponent,
    TermAccountDetailsComponent,
    TermBorrowingAccountMappingComponent,
    TermBorrowingDocumentComponent,
    TermViewBorrowingComponent,
    SiDisbursementComponent,
    SiCollectionComponent,
    SiClosureComponent,
    SiChargesCollectionComponent,
    SaoBorrowingProductDefinitionComponent,
    SaoBorrowingProductDefinitionStepperComponent,
    ViewSaoBorrowingProductDefinitionComponent,
    SaoProductConfigurationComponent,
    SaoInterestPolicyConfigComponent,
    SaoLinkedShareCapitalComponent,
    SaoChargesConfigComponent,
    SaoCollateralsComponent,
    SaoPurposeConfigComponent,
    SaoRequiredDocumentsComponent,
    SiBorrowingProductDefinitionComponent,
    SiBorrowingProductDefinitionStepperComponent,
    ViewSiBorrowingProductDefinitionComponent,
    SiProductConfigComponent,
    SiInterestPolicyComponent,
    SiLinkedShareCapitalComponent,
    SiChargesComponent,
    SiPurposeComponent,
    SiRequiredDocumentsComponent,
    CiBorrowingProductDefinitionComponent,
    ViewCiBorrowingProductDefinitionComponent,
    CiBorrowingProductDefinitionStepperComponent,
    CiProductConfigComponent,
    CiInterestPolicyComponent,
    CiLinkedShareCapitalComponent,
    CiChargesComponent,
    CiPurposeComponent,
    CiRequiredDocumentsComponent,
    TermBorrowingProductDefinitionComponent,
    TermBorrowingProductDefinitionStepperComponent,
    ViewTermBorrowingProductDefinitionComponent,
    TermProductConfigComponent,
    TermInterestPolicyComponent,
    TermChargesComponent,
    TermPurposeComponent,
    TermRequiredDocumentsComponent,
    TermLinkedShareCapitalComponent,

  
   
    
  ],
  imports: [
    CommonModule,
    BorrowingTransactionRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    // BrowserAnimationsModule,
    // BrowserModule,
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
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class BorrowingTransactionModule { }
