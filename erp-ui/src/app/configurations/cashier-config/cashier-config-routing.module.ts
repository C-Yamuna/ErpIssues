import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierConfigComponent } from './cashier-config.component';

import { CommonCategoryComponent } from './common-category/common-category.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
const routes: Routes = [
  {
      path: '', component: CashierConfigComponent,
      children: [
        
        
        { path: 'common_category', component: CommonCategoryComponent},
        { path: 'add_common_category', component: AddCommonCategoryComponent},

        { path: 'workflow', component: WorkFlowComponent},
        { path: 'add_workflow', component: AddWorkFlowComponent},
       
       
      ]
  }
 ];
 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashierConfigRoutingModule { }
