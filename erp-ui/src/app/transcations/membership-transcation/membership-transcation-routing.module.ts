import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipTranscationComponent } from './membership-transcation.component';
import { IndividualComponent } from './individual/individual.component';
import { BasicDetailsComponent } from './individual/basic-details/basic-details.component';
import { CommunicationsComponent } from './individual/communications/communications.component';
import { LandComponent } from './individual/land/land.component';
import { NomineeComponent } from './individual/nominee/nominee.component';
import { FamilyDetailsComponent } from './individual/family-details/family-details.component';
import { AssetComponent } from './individual/asset/asset.component';
import { BClassStepperComponent } from './individual/b-class-stepper/b-class-stepper.component';
import { BClassBasicDetailsComponent } from './individual/b-class-stepper/bclass-basic-details/bclass-basic-details.component';
import { BclassCommunicationsComponent } from './individual/b-class-stepper/bclass-communications/bclass-communications.component';
import { BclassKYCComponent } from './individual/b-class-stepper/bclass-kyc/bclass-kyc.component';
import { BclassFamilyDetailsComponent } from './individual/b-class-stepper/bclass-family-details/bclass-family-details.component';
import { BclassNomineeComponent } from './individual/b-class-stepper/bclass-nominee/bclass-nominee.component';
import { GroupStepperComponent } from './group/group-stepper/group-stepper.component';
import { GroupCommunicationComponent } from './group/group-stepper/group-communication/group-communication.component';
import { GroupBasicDetailsComponent } from './group/group-stepper/group-basic-details/group-basic-details.component';
import { GroupKYCComponent } from './group/group-stepper/group-kyc/group-kyc.component';
import { InstitutionStepperComponent } from './institution/institution-stepper/institution-stepper.component';
import { InstitutionBasicDetailsComponent } from './institution/institution-stepper/institution-basic-details/institution-basic-details.component';
import { InstitutionCommunicationComponent } from './institution/institution-stepper/institution-communication/institution-communication.component';
import { InstitutionkycComponent } from './institution/institution-stepper/institutionkyc/institutionkyc.component';

import { ViewMembershipComponent } from './view-membership/view-membership.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { KYCComponent } from './individual/kyc/kyc.component';
const routes: Routes = [
  
    { path: '', component: TransactionsComponent,

        children: [
          { path: 'membership_transactions', component: MembershipTranscationComponent},

         
          { path: 'individual_stepper', component:IndividualComponent,
            children: [
              { path: 'basic-details', component:BasicDetailsComponent },
              { path: 'communications', component: CommunicationsComponent},
              { path: 'kyc', component: KYCComponent },
              { path: 'land', component: LandComponent },
              { path: 'nominee', component: NomineeComponent },
              { path: 'family-details', component: FamilyDetailsComponent },
              { path: 'asset', component: AssetComponent }
            ]
          },
          { path: 'b-class-stepper', component:BClassStepperComponent,
            children: [
              { path: 'B-class-basicDteails', component:BClassBasicDetailsComponent },
              { path: 'B-class-Communications', component: BclassCommunicationsComponent},
              { path: 'B-class-kyc', component: BclassKYCComponent },
              // { path: 'land', component: LandComponent },
              { path: 'B-class-nominee', component: BclassNomineeComponent },
              { path: 'B-class-family-details', component: BclassFamilyDetailsComponent },
              // { path: 'asset', component: AssetComponent }
            ]
          },
          { path: 'group_stepper', component: GroupStepperComponent,
            children: [
              { path: 'group_basic_details', component:GroupBasicDetailsComponent },
              { path: 'group_communication', component: GroupCommunicationComponent},
              { path: 'group_kyc', component: GroupKYCComponent }
            ]
          },
          { path: 'institution_stepper', component: InstitutionStepperComponent,
            children: [
              { path: 'institution_basic_details', component:InstitutionBasicDetailsComponent },
              { path: 'institution_communication', component: InstitutionCommunicationComponent},
              { path: 'institution_kyc', component: InstitutionkycComponent }
            ]
          },
          { path: 'View_membership', component: ViewMembershipComponent},
       
      ]
    },               
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MembershipTranscationRoutingModule {
 
}
