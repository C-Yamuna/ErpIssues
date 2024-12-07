import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AgentDetailsTransactionComponent } from './agent-details-transaction.component';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AgentDetailsTransactionRoutingModule } from './agent-details-transaction-routing.module';
import { AddAgentDetailsTransactionComponent } from './add-agent-details-transaction/add-agent-details-transaction.component';
import { ViewAgentDetailsTransactionComponent } from './view-agent-details-transaction/view-agent-details-transaction.component';
import { AgentRegistrationStepperComponent } from './agent-registration-stepper/agent-registration-stepper.component';
import { BasicDetailsComponent } from './agent-registration-stepper/basic-details/basic-details.component';
import { CommunicationComponent } from './agent-registration-stepper/communication/communication.component';
import { KycComponent } from './agent-registration-stepper/kyc/kyc.component';
import { NomineeComponent } from './agent-registration-stepper/nominee/nominee.component';
import { SecuritySuretyComponent } from './agent-registration-stepper/security-surety/security-surety.component';
import { DeviceMappingComponent } from './agent-details-operations/device-mapping/device-mapping.component';
import { ProductMappingComponent } from './agent-details-operations/product-mapping/product-mapping.component';
import { CollectionComponent } from './agent-details-operations/collection/collection.component';
import { CommissionCalculationComponent } from './agent-details-operations/commission-calculation/commission-calculation.component';
import { ClosureComponent } from './agent-details-operations/closure/closure.component';
import { MembershipBasicDetailsComponent } from './agent-registration-stepper/membership-basic-details/membership-basic-details.component';
import { MessageModule } from 'primeng/message';
export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AgentDetailsTransactionComponent,
    AddAgentDetailsTransactionComponent,
    ViewAgentDetailsTransactionComponent,
    ProductMappingComponent,
    DeviceMappingComponent,
    CollectionComponent,
    CommissionCalculationComponent,
    ClosureComponent,
    AgentRegistrationStepperComponent,
    BasicDetailsComponent,
    CommunicationComponent,
    KycComponent,
    NomineeComponent,
    SecuritySuretyComponent,
    MembershipBasicDetailsComponent,
  ],
  imports: [
    CommonModule,
    AgentDetailsTransactionRoutingModule,
    PrimengMaterialUiModule,
    FormsModule,
    // BrowserAnimationsModule,
    // BrowserModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient]
      },
      isolate: true
  }),
   TranslateModule,
   HttpClientModule,MessageModule
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    DatePipe
  ]
})
export class AgentDetailsTransactionModule { }
