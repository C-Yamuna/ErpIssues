import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonCategoryService } from './shared/common-category.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-common-category',
  templateUrl: './membership-common-category.component.html',
  styleUrls: ['./membership-common-category.component.css']
})
export class MembershipCommonCategoryComponent {


  tdcommoncategory: any[] = [];
  tdcommoncategorytypes: any[] = [];
  responseModel!: Responsemodel;
  columns: any[] = [];
  gridListData: any[] = [];
  msgs: any[] = [];
  displayDialog!: boolean;
  id: any;

  constructor(private router: Router, private encryptDecryptService: EncryptDecryptService, private commonComponent:CommonComponent,
private commonCategoryService:CommonCategoryService)
     { }
  ngOnInit() {
 
    this.columns = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'description', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' }
     
    ];

    this.tdcommoncategorytypes = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'description', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' }
    ];
    this.getAll();
  }
  addData(){
    this.router.navigate([MembershipConfigConstants.ADD_COMMON_CATEGORY]);
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.commonCategoryService.getAllCommonCategory().subscribe((data: any) => {
      this.responseModel = data;
      this.gridListData = this.responseModel.data;
      this.commonComponent.stopSpinner();
    },
      error => {
        this.msgs = [];
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
  }

 

  editData(row:any) {
    this.router.navigate([MembershipConfigConstants.ADD_COMMON_CATEGORY], { queryParams: { id: this.encryptDecryptService.encrypt(row.id) } })
  }

  deleteData(row:any) {
    this.displayDialog = true;
    this.id = row.id;
  }

  delete(){
    this.commonComponent.startSpinner();
    this.commonCategoryService.deleteCommonCategory(this.id).subscribe(response=>{
      this.responseModel = response;
      if(this.responseModel.status == applicationConstants.STATUS_SUCCESS){
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 2000);
        this.displayDialog = false;
        this.getAll();
      }else{
        this.displayDialog = false;
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }

    },error=>{
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    })

  }

  cancel() {
    this.displayDialog = false;
  }
}
