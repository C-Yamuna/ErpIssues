import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { LoanTranscationRoutingModule } from './loan-transcation-routing.module';
import { LoanTranscationComponent } from './loan-transcation.component';
import { SAOComponent } from './sao/sao.component';
import { SaoStepperComponent } from './sao/sao-stepper/sao-stepper.component';
import { TermLoanComponent } from './term-loan/term-loan.component';
import { SimpleInterestLoanComponent } from './simple-interest-loan/simple-interest-loan.component';
import { CompoundInterestLoanComponent } from './compound-interest-loan/compound-interest-loan.component';
import { TermLoanStepperComponent } from './term-loan/term-loan-stepper/term-loan-stepper.component';
import { SimpleInterestLoanStepperComponent } from './simple-interest-loan/simple-interest-loan-stepper/simple-interest-loan-stepper.component';
import { CompoundInterestLoanStepperComponent } from './compound-interest-loan/compound-interest-loan-stepper/compound-interest-loan-stepper.component';
import { DisbursementComponent } from './operations/disbursement/disbursement.component';
import { CollectionComponent } from './operations/collection/collection.component';
import { ClosureComponent } from './operations/closure/closure.component';
import { EditLoansComponent } from './edit-loans/edit-loans.component';
import { ViewLoansComponent } from './view-loans/view-loans.component';
import { SaoCommunicationComponent } from './sao/sao-stepper/sao-communication/sao-communication.component';
import { SaoKycComponent } from './sao/sao-stepper/sao-kyc/sao-kyc.component';
import { SaoLoanDocumentsComponent } from './sao/sao-stepper/sao-loan-documents/sao-loan-documents.component';
import { SaoLoanGenealogyTreeComponent } from './sao/sao-stepper/sao-loan-genealogy-tree/sao-loan-genealogy-tree.component';
import { SaoLoanGuarantorComponent } from './sao/sao-stepper/sao-loan-guarantor/sao-loan-guarantor.component';
import { SaoLoanMortagageComponent } from './sao/sao-stepper/sao-loan-mortagage/sao-loan-mortagage.component';
import { SaoNomineeComponent } from './sao/sao-stepper/sao-nominee/sao-nominee.component';
import { TermLoansProductDetailsComponent } from './term-loan/term-loan-stepper/term-loans-product-details/term-loans-product-details.component';
import { TermLoansCommunicationComponent } from './term-loan/term-loan-stepper/term-loans-communication/term-loans-communication.component';
import { TermLoansKycComponent } from './term-loan/term-loan-stepper/term-loans-kyc/term-loans-kyc.component';
import { TermLoansLoanGuarantorComponent } from './term-loan/term-loan-stepper/term-loans-loan-guarantor/term-loans-loan-guarantor.component';
import { TermLoansNomineeComponent } from './term-loan/term-loan-stepper/term-loans-nominee/term-loans-nominee.component';
import { TermLoanMortgageComponent } from './term-loan/term-loan-stepper/term-loan-mortgage/term-loan-mortgage.component';
import { TermLoanDocumentsComponent } from './term-loan/term-loan-stepper/term-loan-documents/term-loan-documents.component';
import { TermLoanGenealogyTreeComponent } from './term-loan/term-loan-stepper/term-loan-genealogy-tree/term-loan-genealogy-tree.component';
import { SiCommunicationComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-communication/si-communication.component';
import { SiKycComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-kyc/si-kyc.component';
import { SiLoanGuarantorComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-guarantor/si-loan-guarantor.component';
import { SiNomineeComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-nominee/si-nominee.component';
import { SiLoanMortgageComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-mortgage/si-loan-mortgage.component';
import { SiLoanDocumentsComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-documents/si-loan-documents.component';
import { SiLoanGenealogyTreeComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-genealogy-tree/si-loan-genealogy-tree.component';
import { CiProductDetailsComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-product-details/ci-product-details.component';
import { CiCommunicationComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-communication/ci-communication.component';
import { CiKycComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-kyc/ci-kyc.component';
import { CiLoanGuarantorComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-loan-guarantor/ci-loan-guarantor.component';
import { CiNomineeComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-nominee/ci-nominee.component';
import { CiLoanMortgageComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-loan-mortgage/ci-loan-mortgage.component';
import { CiLoanDocumentsComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-loan-documents/ci-loan-documents.component';
import { CiLoanGenealogyTreeComponent } from './compound-interest-loan/compound-interest-loan-stepper/ci-loan-genealogy-tree/ci-loan-genealogy-tree.component';
import { SaoProductDetailsComponent } from './sao/sao-stepper/sao-product-details/sao-product-details.component';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient,HttpClientModule } from '@angular/common/http';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { ViewSaoLoansComponent } from './sao/view-sao-loans/view-sao-loans.component';
import { DepositorLoanComponent } from './depositor-loan/depositor-loan.component';
import { DepositorLoanStepperComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-stepper.component';
import { DepositorLoanProductDetailsComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-product-details/depositor-loan-product-details.component';
import { DepositorLoanCommunicationComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-communication/depositor-loan-communication.component';
import { DepositorLoanNomineeComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-nominee/depositor-loan-nominee.component';
import { DepositorLoanMortgageComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-mortgage/depositor-loan-mortgage.component';
import { DepositorLoanDocumentsComponent } from './depositor-loan/depositor-loan-stepper/depositor-loan-documents/depositor-loan-documents.component';
import { MembershipBasicDetailsComponent } from './sao/sao-stepper/membership-basic-details/membership-basic-details.component';
import { SaoLoanJointMemberComponent } from './sao/sao-stepper/sao-loan-joint-member/sao-loan-joint-member.component';
import { SiLoanApplicationDetailsComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-application-details/si-loan-application-details.component';
import { SiLoanMembershipDetailsComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-membership-details/si-loan-membership-details.component';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { SaoProductDefinitionComponent } from './sao/sao-product-definition/sao-product-definition.component';
import { SaoProductDefinitionStepperComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-product-definition-stepper.component';
import { SaoProductConfigrationComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-product-configration/sao-product-configration.component';
import { SaoInterestPolicyConigComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-interest-policy-conig/sao-interest-policy-conig.component';
import { SaoLoanLinkedShareCapitalComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-loan-linked-share-capital/sao-loan-linked-share-capital.component';
import { SaoProductChargesConfigComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-product-charges-config/sao-product-charges-config.component';
import { SaoProdPurposeConfigComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-prod-purpose-config/sao-prod-purpose-config.component';
import { SaoRequiredDocumentsConfigComponent } from './sao/sao-product-definition/sao-product-definition-stepper/sao-required-documents-config/sao-required-documents-config.component';
import { ViewSimpleInterestLoanComponent } from './simple-interest-loan/view-simple-interest-loan/view-simple-interest-loan.component';
import { SimpleInterestLoanDisbursementComponent } from './simple-interest-loan/simple-interest-loan-operations/simple-interest-loan-disbursement/simple-interest-loan-disbursement.component';
import { SimpleInterestLoanCollectionComponent } from './simple-interest-loan/simple-interest-loan-operations/simple-interest-loan-collection/simple-interest-loan-collection.component';
import { SimpleInterestLoanClosureComponent } from './simple-interest-loan/simple-interest-loan-operations/simple-interest-loan-closure/simple-interest-loan-closure.component';
import { SiLoanJointAccountComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-joint-account/si-loan-joint-account.component';
import { SiLoanNewMembershipComponent } from './simple-interest-loan/simple-interest-loan-stepper/si-loan-new-membership/si-loan-new-membership.component';
import { SaoLoanDisbursmentComponent } from './sao/sao-operations/sao-loan-disbursment/sao-loan-disbursment.component';
import { SaoLoanCollectionsComponent } from './sao/sao-operations/sao-loan-collections/sao-loan-collections.component';
import { SaoClosureComponent } from './sao/sao-operations/sao-closure/sao-closure.component';
import { ViewSaoProductDefinitionComponent } from './sao/sao-product-definition/view-sao-product-definition/view-sao-product-definition.component';
import { SimpleInterestProductDefinitionComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition.component';
import { SimpleInterestProductDefinitionStepperComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/simple-interest-product-definition-stepper.component';
import { ViewSimpleInterestProductDefinitionComponent } from './simple-interest-loan/simple-interest-product-definition/view-simple-interest-product-definition/view-simple-interest-product-definition.component';
import { SiInterestPolicyComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/si-interest-policy/si-interest-policy.component';
import { SiLinkedShareCapitalComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/si-linked-share-capital/si-linked-share-capital.component';
import { SiChargesComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/si-charges/si-charges.component';
import { SiPurposeComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/si-purpose/si-purpose.component';
import { SiRequiredDocumentsComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/si-required-documents/si-required-documents.component';
import { SimpleInterestProductConfigurationComponent } from './simple-interest-loan/simple-interest-product-definition/simple-interest-product-definition-stepper/simple-interest-product-configuration/simple-interest-product-configuration.component';
import { CompoundInterestProductDefinitionComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition.component';
import { ViewCompoundInterestProductDefinitionComponent } from './compound-interest-loan/compound-interest-product-definition/view-compound-interest-product-definition/view-compound-interest-product-definition.component';
import { CompoundInterestProductDefinitionStepperComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/compound-interest-product-definition-stepper.component';
import { CiInterestPolicyComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-interest-policy/ci-interest-policy.component';
import { CiLinkedShareCapitalComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-linked-share-capital/ci-linked-share-capital.component';
import { CiChargesComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-charges/ci-charges.component';
import { CiPurposeComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-purpose/ci-purpose.component';
import { CiRequiredDocumentsComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-required-documents/ci-required-documents.component';
import { CiProductConfigurationComponent } from './compound-interest-loan/compound-interest-product-definition/compound-interest-product-definition-stepper/ci-product-configuration/ci-product-configuration.component';
import { TermLoanProductDefinitionComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition.component';
import { TermLoanProductDefinitionStepperComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-product-definition-stepper.component';
import { ViewTermLoanProductDefinitionComponent } from './term-loan/term-loan-product-definition/view-term-loan-product-definition/view-term-loan-product-definition.component';
import { TermLoanProductConfigurationComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-product-configuration/term-loan-product-configuration.component';
import { TermLoanInterestPolicyComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-interest-policy/term-loan-interest-policy.component';
import { TermLoanLinkedShareCapitalComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-linked-share-capital/term-loan-linked-share-capital.component';
import { TermLoanChargesComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-charges/term-loan-charges.component';
import { TermLoanPurposeComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-purpose/term-loan-purpose.component';
import { TermLoanRequiredDocumentsComponent } from './term-loan/term-loan-product-definition/term-loan-product-definition-stepper/term-loan-required-documents/term-loan-required-documents.component';
@NgModule({
  declarations: [
    LoanTranscationComponent,
    SAOComponent,
    SaoStepperComponent,
    TermLoanComponent,
    SimpleInterestLoanComponent,
    CompoundInterestLoanComponent,
    TermLoanStepperComponent,
    SimpleInterestLoanStepperComponent,
    CompoundInterestLoanStepperComponent,
    DisbursementComponent,
    CollectionComponent,
    ClosureComponent,
    EditLoansComponent,
    ViewLoansComponent,
    SaoProductDetailsComponent,
    SaoCommunicationComponent,
    SaoKycComponent,
    SaoLoanDocumentsComponent,
    SaoLoanGenealogyTreeComponent,
    SaoLoanGuarantorComponent,
    SaoLoanMortagageComponent,
    SaoNomineeComponent,
    TermLoansProductDetailsComponent,
    TermLoansCommunicationComponent,
    TermLoansKycComponent,
    TermLoansLoanGuarantorComponent,
    TermLoansNomineeComponent,
    TermLoanMortgageComponent,
    TermLoanDocumentsComponent,
    TermLoanGenealogyTreeComponent,
    SiCommunicationComponent,
    SiKycComponent,
    SiLoanGuarantorComponent,
    SiNomineeComponent,
    SiLoanMortgageComponent,
    SiLoanDocumentsComponent,
    SiLoanGenealogyTreeComponent,
    CiProductDetailsComponent,
    CiCommunicationComponent,
    CiKycComponent,
    CiLoanGuarantorComponent,
    CiNomineeComponent,
    CiLoanMortgageComponent,
    CiLoanDocumentsComponent,
    CiLoanGenealogyTreeComponent,
    ViewSaoLoansComponent,
    DepositorLoanComponent,
    DepositorLoanStepperComponent,
    DepositorLoanProductDetailsComponent,
    DepositorLoanCommunicationComponent,
    DepositorLoanNomineeComponent,
    DepositorLoanMortgageComponent,
    DepositorLoanDocumentsComponent,
    MembershipBasicDetailsComponent,
    SaoLoanJointMemberComponent,
    SiLoanApplicationDetailsComponent,
    SiLoanMembershipDetailsComponent,
    SaoProductDefinitionComponent,
    SaoProductDefinitionStepperComponent,
    SaoProductConfigrationComponent,
    SaoInterestPolicyConigComponent,
    SaoLoanLinkedShareCapitalComponent,
    SaoProductChargesConfigComponent,
    SaoProdPurposeConfigComponent,
    SaoRequiredDocumentsConfigComponent,
    ViewSimpleInterestLoanComponent,
    SimpleInterestLoanDisbursementComponent,
    SimpleInterestLoanCollectionComponent,
    SimpleInterestLoanClosureComponent,
    SiLoanJointAccountComponent,
    SiLoanNewMembershipComponent,
    SaoLoanDisbursmentComponent,
    SaoLoanCollectionsComponent,
    SaoClosureComponent,
    ViewSaoProductDefinitionComponent,
    SimpleInterestProductDefinitionComponent,
    SimpleInterestProductDefinitionStepperComponent,
    ViewSimpleInterestProductDefinitionComponent,
    SiInterestPolicyComponent,
    SiLinkedShareCapitalComponent,
    SiChargesComponent,
    SiPurposeComponent,
    SiRequiredDocumentsComponent,
    SimpleInterestProductConfigurationComponent,
    CompoundInterestProductDefinitionComponent,
    ViewCompoundInterestProductDefinitionComponent,
    CompoundInterestProductDefinitionStepperComponent,
    CiInterestPolicyComponent,
    CiLinkedShareCapitalComponent,
    CiChargesComponent,
    CiPurposeComponent,
    CiRequiredDocumentsComponent,
    CiProductConfigurationComponent,
    TermLoanProductDefinitionComponent,
    TermLoanProductDefinitionStepperComponent,
    ViewTermLoanProductDefinitionComponent,
    TermLoanProductConfigurationComponent,
    TermLoanInterestPolicyComponent,
    TermLoanLinkedShareCapitalComponent,
    TermLoanChargesComponent,
    TermLoanPurposeComponent,
    TermLoanRequiredDocumentsComponent
 
  ],
  imports: [
    CommonModule,
    LoanTranscationRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    MessageModule,
    DialogModule,
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
  ]
})
export class LoanTranscationModule { }
