import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { MembershipTranscationRoutingModule } from './membership-transcation-routing.module';
import { MembershipTranscationComponent } from './membership-transcation.component';
import { GroupComponent } from './group/group.component';
import { GroupStepperComponent } from './group/group-stepper/group-stepper.component';
import { GroupBasicDetailsComponent } from './group/group-stepper/group-basic-details/group-basic-details.component';
import { GroupCommunicationComponent } from './group/group-stepper/group-communication/group-communication.component';
import { GroupKYCComponent } from './group/group-stepper/group-kyc/group-kyc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengMaterialUiModule } from 'src/app/shared/primeng.material.module';
import { BasicDetailsComponent } from './individual/basic-details/basic-details.component';
import { CommunicationsComponent } from './individual/communications/communications.component';
import { KYCComponent } from './individual/kyc/kyc.component';
import { LandComponent } from './individual/land/land.component';
import { NomineeComponent } from './individual/nominee/nominee.component';
import { FamilyDetailsComponent } from './individual/family-details/family-details.component';
import { AssetComponent } from './individual/asset/asset.component';
import { BClassStepperComponent } from './individual/b-class-stepper/b-class-stepper.component';
import { BClassBasicDetailsComponent } from './individual/b-class-stepper/bclass-basic-details/bclass-basic-details.component';
import { BclassCommunicationsComponent } from './individual/b-class-stepper/bclass-communications/bclass-communications.component';
import { BclassKYCComponent } from './individual/b-class-stepper/bclass-kyc/bclass-kyc.component';
import { BclassNomineeComponent } from './individual/b-class-stepper/bclass-nominee/bclass-nominee.component';
import { BclassFamilyDetailsComponent } from './individual/b-class-stepper/bclass-family-details/bclass-family-details.component';
import { InstitutionComponent } from './institution/institution.component';
import { InstitutionStepperComponent } from './institution/institution-stepper/institution-stepper.component';
import { InstitutionBasicDetailsComponent } from './institution/institution-stepper/institution-basic-details/institution-basic-details.component';
import { InstitutionCommunicationComponent } from './institution/institution-stepper/institution-communication/institution-communication.component';
import { InstitutionkycComponent } from './institution/institution-stepper/institutionkyc/institutionkyc.component';
import { ViewMembershipComponent } from './view-membership/view-membership.component';
import { IndividualComponent } from './individual/individual.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransactionsComponent } from '../transactions/transactions.component';
// i18n translater
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient,HttpClientModule } from '@angular/common/http';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CommonHttpService } from 'src/app/shared/common-http.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { MessageModule } from 'primeng/message';
import { TabMenuModule } from 'primeng/tabmenu';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { FileUploadModule } from 'primeng/fileupload';

import { MenuModule } from 'primeng/menu'; // Import MenuModule from PrimeNG
import { ErpInterceptor } from 'src/app/shared/erpInterceptor';


export function httpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MembershipTranscationComponent,
    GroupComponent,
    GroupStepperComponent,
    GroupBasicDetailsComponent,
    GroupCommunicationComponent,
    GroupKYCComponent,
    BasicDetailsComponent,
    CommunicationsComponent,
    KYCComponent,
    LandComponent,
    NomineeComponent,
    AssetComponent,
    BClassStepperComponent,
    BClassBasicDetailsComponent,
    BclassCommunicationsComponent,
    BclassKYCComponent,
    BclassNomineeComponent,
    BclassFamilyDetailsComponent,
    InstitutionComponent,
    InstitutionStepperComponent,
    InstitutionBasicDetailsComponent,
    InstitutionCommunicationComponent,
    InstitutionkycComponent,
    ViewMembershipComponent,
    FamilyDetailsComponent,
    IndividualComponent,
    TransactionsComponent,
       
  ],
  imports: [
    CommonModule,
    MembershipTranscationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengMaterialUiModule,
    MessageModule,
    FileUploadModule,
    TabMenuModule,  
    TieredMenuModule,
    NgxSpinnerModule,
    MenuModule,

    // BrowserAnimationsModule
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
   ScrollPanelModule,
  ],
  providers: [
    CommonHttpService,
    EncryptDecryptService,
    CommonComponent,
    ConfirmationService,
    MessageService,
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:   ErpInterceptor,
      multi: true
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy },

  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA,
    // NO_ERRORS_SCHEMA
]
  
})
export class MembershipTranscationModule { }
