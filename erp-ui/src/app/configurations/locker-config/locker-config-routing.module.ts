import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LockerConfigComponent } from './locker-config.component';
import { LockerVendorDetailsComponent } from './locker-vendor-details/locker-vendor-details.component';
import { AddLockerVendorDetailsComponent } from './locker-vendor-details/add-locker-vendor-details/add-locker-vendor-details.component';
import { WorkFlowComponent } from './work-flow/work-flow.component';
import { CommonCategoryComponent } from './common-category/common-category.component';
import { LockerConfigsComponent } from './locker-configs/locker-configs.component';
import { AddWorkFlowComponent } from './work-flow/add-work-flow/add-work-flow.component';
import { AddCommonCategoryComponent } from './common-category/add-common-category/add-common-category.component';
import { AddLockerConfigsComponent } from './locker-configs/add-locker-configs/add-locker-configs.component';

const routes: Routes = [
  {
    path: '', component: LockerConfigComponent,
    children: [
      { path: 'vendor_details', component: LockerVendorDetailsComponent },
      { path: 'add_vendor_details', component: AddLockerVendorDetailsComponent },
      { path: 'workflow', component: WorkFlowComponent },
      { path: 'add_workflow', component: AddWorkFlowComponent },
      { path: 'common_category', component: CommonCategoryComponent },
      { path: 'add_common_category', component: AddCommonCategoryComponent },
      { path: 'locker_config', component: LockerConfigsComponent },
      { path: 'add_locker_config', component: AddLockerConfigsComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockerConfigRoutingModule { }
