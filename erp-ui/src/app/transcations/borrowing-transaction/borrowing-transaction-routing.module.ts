import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { BorrowingTransactionComponent } from './borrowing-transaction.component';
import { ViewBorrowingComponent } from './view-borrowing/view-borrowing.component';
import { ChargesCollectionComponent } from './operations/charges-collection/charges-collection.component';
import { ClosureComponent } from './operations/closure/closure.component';
import { CollectionComponent } from './operations/collection/collection.component';
import { DisbursementComponent } from './operations/disbursement/disbursement.component';
import { EmiChartComponent } from './operations/emi-chart/emi-chart.component';
import { CiBorrowingComponent } from './ci-borrowing/ci-borrowing.component';
import { CiBorrowingStepperComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-stepper.component';
import { CiAccountDetailsComponent } from './ci-borrowing/ci-borrowing-stepper/ci-account-details/ci-account-details.component';
import { CiBorrowingAccountMappingComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-account-mapping/ci-borrowing-account-mapping.component';
import { CiBorrowingDocumentsComponent } from './ci-borrowing/ci-borrowing-stepper/ci-borrowing-documents/ci-borrowing-documents.component';
import { CiViewBorrowingComponent } from './ci-borrowing/ci-view-borrowing/ci-view-borrowing.component';
import { SaoBorrowingComponent } from './sao-borrowing/sao-borrowing.component';
import { SaoViewBorrowingComponent } from './sao-borrowing/sao-view-borrowing/sao-view-borrowing.component';
import { SaoBorrowingStepperComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-stepper.component';
import { SaoAccountDetailsComponent } from './sao-borrowing/sao-borrowing-stepper/sao-account-details/sao-account-details.component';
import { SaoBorrowingAccountMappingComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-account-mapping/sao-borrowing-account-mapping.component';
import { SaoBorrowingDocumentsComponent } from './sao-borrowing/sao-borrowing-stepper/sao-borrowing-documents/sao-borrowing-documents.component';
import { SiBorrowingComponent } from './si-borrowing/si-borrowing.component';
import { SiViewBorrowingComponent } from './si-borrowing/si-view-borrowing/si-view-borrowing.component';
import { SiBorrowingStepperComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-stepper.component';
import { SiAccountDetailsComponent } from './si-borrowing/si-borrowing-stepper/si-account-details/si-account-details.component';
import { SiBorrowingAccountMappingComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-account-mapping/si-borrowing-account-mapping.component';
import { SiBorrowingDocumentComponent } from './si-borrowing/si-borrowing-stepper/si-borrowing-document/si-borrowing-document.component';
import { TermBorrowingComponent } from './term-borrowing/term-borrowing.component';
import { TermViewBorrowingComponent } from './term-borrowing/term-view-borrowing/term-view-borrowing.component';
import { TermBorrowingStepperComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-stepper.component';
import { TermAccountDetailsComponent } from './term-borrowing/term-borrowing-stepper/term-account-details/term-account-details.component';
import { TermBorrowingAccountMappingComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-account-mapping/term-borrowing-account-mapping.component';
import { TermBorrowingDocumentComponent } from './term-borrowing/term-borrowing-stepper/term-borrowing-document/term-borrowing-document.component';
import { SiChargesCollectionComponent } from './si-borrowing/si-operations/si-charges-collection/si-charges-collection.component';
import { SiClosureComponent } from './si-borrowing/si-operations/si-closure/si-closure.component';
import { SiCollectionComponent } from './si-borrowing/si-operations/si-collection/si-collection.component';
import { SiDisbursementComponent } from './si-borrowing/si-operations/si-disbursement/si-disbursement.component';
import { SaoBorrowingProductDefinitionComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition.component';
import { ViewSaoBorrowingProductDefinitionComponent } from './sao-borrowing/sao-borrowing-product-definition/view-sao-borrowing-product-definition/view-sao-borrowing-product-definition.component';
import { SaoBorrowingProductDefinitionStepperComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-borrowing-product-definition-stepper.component';
import { SaoProductConfigurationComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-product-configuration/sao-product-configuration.component';
import { SaoLinkedShareCapitalComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-linked-share-capital/sao-linked-share-capital.component';
import { SaoInterestPolicyConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-interest-policy-config/sao-interest-policy-config.component';
import { SaoChargesConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-charges-config/sao-charges-config.component';
import { SaoPurposeConfigComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-purpose-config/sao-purpose-config.component';
import { SaoRequiredDocumentsComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-required-documents/sao-required-documents.component';
import { SaoCollateralsComponent } from './sao-borrowing/sao-borrowing-product-definition/sao-borrowing-product-definition-stepper/sao-collaterals/sao-collaterals.component';
import { SiBorrowingProductDefinitionComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition.component';
import { ViewSiBorrowingProductDefinitionComponent } from './si-borrowing/si-borrowing-product-definition/view-si-borrowing-product-definition/view-si-borrowing-product-definition.component';
import { SiBorrowingProductDefinitionStepperComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-borrowing-product-definition-stepper.component';
import { SiProductConfigComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-product-config/si-product-config.component';
import { SiInterestPolicyComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-interest-policy/si-interest-policy.component';
import { SiLinkedShareCapitalComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-linked-share-capital/si-linked-share-capital.component';
import { SiCharges } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-charges/shared/si-charges.model';
import { SiPurpose } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-purpose/shared/si-purpose.model';
import { SiRequiredDocuments } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-required-documents/shared/si-required-documents.model';
import { SiChargesComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-charges/si-charges.component';
import { SiPurposeComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-purpose/si-purpose.component';
import { SiRequiredDocumentsComponent } from './si-borrowing/si-borrowing-product-definition/si-borrowing-product-definition-stepper/si-required-documents/si-required-documents.component';
import { CiBorrowingProductDefinitionComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition.component';
import { ViewCiBorrowingProductDefinitionComponent } from './ci-borrowing/ci-borrowing-product-definition/view-ci-borrowing-product-definition/view-ci-borrowing-product-definition.component';
import { CiBorrowingProductDefinitionStepperComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-borrowing-product-definition-stepper.component';
import { CiProductConfigComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-product-config/ci-product-config.component';
import { CiInterestPolicy } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-interest-policy/shared/ci-interest-policy.model';
import { CiInterestPolicyComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-interest-policy/ci-interest-policy.component';
import { CiLinkedShareCapitalComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-linked-share-capital/ci-linked-share-capital.component';
import { CiChargesComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-charges/ci-charges.component';
import { CiPurposeComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-purpose/ci-purpose.component';
import { CiRequiredDocumentsComponent } from './ci-borrowing/ci-borrowing-product-definition/ci-borrowing-product-definition-stepper/ci-required-documents/ci-required-documents.component';
import { TermBorrowingProductDefinitionComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition.component';
import { ViewTermBorrowingProductDefinitionComponent } from './term-borrowing/term-borrowing-product-definition/view-term-borrowing-product-definition/view-term-borrowing-product-definition.component';
import { TermBorrowingProductDefinitionStepperComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-borrowing-product-definition-stepper.component';
import { TermProductConfigComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-product-config/term-product-config.component';
import { TermInterestPolicyComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-interest-policy/term-interest-policy.component';
import { TermLinkedShareCapitalComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-linked-share-capital/term-linked-share-capital.component';
import { TermChargesComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-charges/term-charges.component';
import { TermPurposeComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-purpose/term-purpose.component';
import { TermRequiredDocumentsComponent } from './term-borrowing/term-borrowing-product-definition/term-borrowing-product-definition-stepper/term-required-documents/term-required-documents.component';
const routes: Routes = [
  {
    path: '', component: TransactionsComponent,
    children: [

      { path: 'borrowing_transactions', component: BorrowingTransactionComponent },
      { path: 'view_borrowing', component: ViewBorrowingComponent },
      { path: 'charges_collection', component: ChargesCollectionComponent },
      { path: 'closure', component: ClosureComponent },
      { path: 'collection', component: CollectionComponent },
      { path: 'disbursement', component: DisbursementComponent },
      { path: 'emi_chart', component: EmiChartComponent },
      { path: 'ci_borrowing', component: CiBorrowingComponent },
      { path: 'ci_view_borrowing', component: CiViewBorrowingComponent },
      {
        path: 'ci_borrowing_stepper', component: CiBorrowingStepperComponent,
        children: [
          { path: 'ci_account_details', component: CiAccountDetailsComponent },
          { path: 'ci_borrowing_account_mapping', component: CiBorrowingAccountMappingComponent },
          { path: 'ci_borrowing_document', component: CiBorrowingDocumentsComponent }
        ]
      },


      { path: 'sao_borrowing', component: SaoBorrowingComponent },
      { path: 'sao_view_borrowing', component: SaoViewBorrowingComponent },
      {
        path: 'sao_borrowing_stepper', component: SaoBorrowingStepperComponent,
        children: [
          { path: 'sao_account_details', component: SaoAccountDetailsComponent },
          { path: 'sao_borrowing_account_mapping', component: SaoBorrowingAccountMappingComponent },
          { path: 'sao_borrowing_document', component: SaoBorrowingDocumentsComponent }
        ]
      },

      { path: 'si_borrowing', component: SiBorrowingComponent },
      { path: 'si_view_borrowing', component: SiViewBorrowingComponent },
      { path: 'si_charges_collection', component: SiChargesCollectionComponent },
      { path: 'si_closure', component: SiClosureComponent },
      { path: 'si_collection', component: SiCollectionComponent },
      { path: 'si_disbursement', component: SiDisbursementComponent },




      {
        path: 'si_borrowing_stepper', component: SiBorrowingStepperComponent,
        children: [
          { path: 'si_account_details', component: SiAccountDetailsComponent },
          { path: 'si_borrowing_account_mapping', component: SiBorrowingAccountMappingComponent },
          { path: 'si_borrowing_document', component: SiBorrowingDocumentComponent }
        ]
      },
      { path: 'term_borrowing', component: TermBorrowingComponent },
      { path: 'term_view_borrowing', component: TermViewBorrowingComponent },
      {
        path: 'term_borrowing_stepper', component: TermBorrowingStepperComponent,
        children: [
          { path: 'term_account_details', component: TermAccountDetailsComponent },
          { path: 'term_borrowing_account_mapping', component: TermBorrowingAccountMappingComponent },
          { path: 'term_borrowing_document', component: TermBorrowingDocumentComponent }
        ]
      },

      { path: 'sao_borrowings_product_definition',component:SaoBorrowingProductDefinitionComponent},
      { path: 'view_sao_borrowings_product_definition',component:ViewSaoBorrowingProductDefinitionComponent},
      {
        path: 'sao_borrowings_product_definition_stepper', component:SaoBorrowingProductDefinitionStepperComponent,
        children: [
          { path: 'sao_product_configuration', component:SaoProductConfigurationComponent},
          { path: 'sao_interest_policy_config', component: SaoInterestPolicyConfigComponent},
          { path: 'sao_linked_share_capital', component: SaoLinkedShareCapitalComponent},
          { path: 'sao_product_charges_config', component: SaoChargesConfigComponent},
          { path: 'sao_prod_purpose_config', component: SaoPurposeConfigComponent},
          { path: 'sao_required_documents_config', component: SaoRequiredDocumentsComponent},
          { path: 'sao_collaterals', component: SaoCollateralsComponent},
        ]
      },
      { path: 'si_borrowings_product_definition',component:SiBorrowingProductDefinitionComponent},
      { path: 'view_si_borrowings_product_definition',component:ViewSiBorrowingProductDefinitionComponent},
      {
        path: 'si_borrowings_product_definition_stepper', component:SiBorrowingProductDefinitionStepperComponent,
        children: [
          { path: 'si_product_configuration', component:SiProductConfigComponent},
          { path: 'si_interest_policy_config', component: SiInterestPolicyComponent},
          { path: 'si_linked_share_capital', component: SiLinkedShareCapitalComponent},
          { path: 'si_product_charges_config', component: SiChargesComponent},
          { path: 'si_prod_purpose_config', component: SiPurposeComponent},
          { path: 'si_required_documents_config', component: SiRequiredDocumentsComponent},
          
        ]
      },

      { path: 'ci_borrowings_product_definition',component:CiBorrowingProductDefinitionComponent},
      { path: 'view_ci_borrowings_product_definition',component:ViewCiBorrowingProductDefinitionComponent},
      {
        path: 'ci_borrowings_product_definition_stepper', component:CiBorrowingProductDefinitionStepperComponent,
        children: [
          { path: 'ci_product_configuration', component:CiProductConfigComponent},
          { path: 'ci_interest_policy_config', component: CiInterestPolicyComponent},
          { path: 'ci_linked_share_capital', component: CiLinkedShareCapitalComponent},
          { path: 'ci_product_charges_config', component: CiChargesComponent},
          { path: 'ci_prod_purpose_config', component: CiPurposeComponent},
          { path: 'ci_required_documents_config', component: CiRequiredDocumentsComponent},
          
        ]
      },
      { path: 'term_borrowings_product_definition',component:TermBorrowingProductDefinitionComponent},
      { path: 'view_term_borrowings_product_definition',component:ViewTermBorrowingProductDefinitionComponent},
      {
        path: 'term_borrowings_product_definition_stepper', component:TermBorrowingProductDefinitionStepperComponent,
        children: [
          { path: 'term_product_configuration', component:TermProductConfigComponent},
          { path: 'term_interest_policy_config', component: TermInterestPolicyComponent},
          { path: 'term_linked_share_capital', component: TermLinkedShareCapitalComponent},
          { path: 'term_product_charges_config', component: TermChargesComponent},
          { path: 'term_prod_purpose_config', component: TermPurposeComponent},
          { path: 'term_required_documents_config', component: TermRequiredDocumentsComponent},
          
        ]
      },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowingTransactionRoutingModule { }
