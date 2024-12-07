import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from '../transactions/transactions.component';
import { AgentDetailsTransactionComponent } from './agent-details-transaction.component';
import { AddAgentDetailsTransactionComponent } from './add-agent-details-transaction/add-agent-details-transaction.component';
import { ViewAgentDetailsTransactionComponent } from './view-agent-details-transaction/view-agent-details-transaction.component';
import { AgentRegistrationStepperComponent } from './agent-registration-stepper/agent-registration-stepper.component';
import { BasicDetailsComponent } from './agent-registration-stepper/basic-details/basic-details.component';
import { CommunicationComponent } from './agent-registration-stepper/communication/communication.component';
import { KycComponent } from './agent-registration-stepper/kyc/kyc.component';
import { NomineeComponent } from './agent-registration-stepper/nominee/nominee.component';
import { SecuritySuretyComponent } from './agent-registration-stepper/security-surety/security-surety.component';
import { ProductMappingComponent } from './agent-details-operations/product-mapping/product-mapping.component';
import { DeviceMappingComponent } from './agent-details-operations/device-mapping/device-mapping.component';
import { CollectionComponent } from './agent-details-operations/collection/collection.component';
import { CommissionCalculationComponent } from './agent-details-operations/commission-calculation/commission-calculation.component';
import { ClosureComponent } from './agent-details-operations/closure/closure.component';
import { MembershipBasicDetailsComponent } from './agent-registration-stepper/membership-basic-details/membership-basic-details.component';

const routes: Routes = [
  {
    path: '', component:TransactionsComponent,
    children: [

      {path: 'agent_details_transaction', component:AgentDetailsTransactionComponent},

      {path: 'add_agent_details_transaction', component:AddAgentDetailsTransactionComponent},

      {path: 'view_agent_details_transaction', component:ViewAgentDetailsTransactionComponent},

      {path: 'edit_agent_details_transaction', component:AddAgentDetailsTransactionComponent},

      {path: 'product_mapping', component:ProductMappingComponent},

      {path: 'device_mapping', component:DeviceMappingComponent},

      {path: 'collection', component:CollectionComponent},

      {path: 'commission_calculation', component:CommissionCalculationComponent},

      {path: 'closure', component:ClosureComponent},

      {
        path: 'agent_registration_stepper', component:AgentRegistrationStepperComponent,
        
        children: [
          
          { path: 'basic_details', component:BasicDetailsComponent },
          
          { path: 'communication', component: CommunicationComponent},
          
          { path: 'kyc', component: KycComponent },
          
          { path: 'nominee', component: NomineeComponent },
          
          { path: 'security_surety', component: SecuritySuretyComponent },

          { path: 'membership_basic_details', component: MembershipBasicDetailsComponent },

        ]
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentDetailsTransactionRoutingModule { }
