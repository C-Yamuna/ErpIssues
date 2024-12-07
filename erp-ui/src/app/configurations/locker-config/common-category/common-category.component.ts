import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LockerConfigConstants } from '../locker-config-constants';
import { Router } from '@angular/router';
import { CommonCategoryService } from './shared/common-category.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { Responsemodel } from 'src/app/shared/responsemodel';

@Component({
  selector: 'app-common-category',
  templateUrl: './common-category.component.html',
  styleUrls: ['./common-category.component.css']
})
export class CommonCategoryComponent {
  tdcommoncategory: any[] = [];
  tdcommoncategorytypes: any[] = [];
  responseModel!: Responsemodel;
  columns: any[] = [];
  gridListData: any[] = [];
  msgs: any[] = [];
  displayDialog: boolean = applicationConstants.FALSE;
  id: any;
  deleteId: any;
  constructor(private router: Router, private encryptDecryptService: EncryptDecryptService, private commonComponent:CommonComponent,
private commonCategoryService:CommonCategoryService)
     { }
     ngOnInit() {
 
      this.columns = [
        { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
        { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
        { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' }
       
      ];
  
      this.tdcommoncategorytypes = [
        { field: 'name', header: 'DAILYDEPOSITSCONFIG.NAME' },
        { field: 'description', header: 'DAILYDEPOSITSCONFIG.DESCRIPTION' },
        { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' }
      ];
      this.getAll();
    }
    addData(){
      this.router.navigate([LockerConfigConstants.ADD_COMMON_CATEGORY]);
    }
  
    getAll() {
      this.commonComponent.startSpinner();
      this.commonCategoryService.getAllCommonCategory().subscribe((data: any) => {
        this.responseModel = data;
        if (this.responseModel != null&& this.responseModel.data!= undefined) {
        this.gridListData = this.responseModel.data;
        }
        else{
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
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
      this.router.navigate([LockerConfigConstants.ADD_COMMON_CATEGORY], { queryParams: { id: this.encryptDecryptService.encrypt(row.id) } })
    }
  
    
    submit(){
      this.commonComponent.startSpinner();
      this.commonCategoryService.deleteCommonCategory(this.deleteId).subscribe(response => {
        this.responseModel = response;
        this.msgs = [];
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS ) {
          if (this.responseModel.data != null && this.responseModel.data != undefined) {
          this.commonComponent.stopSpinner();
          this.displayDialog = applicationConstants.FALSE;
          this.msgs = [];
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.getAll();
          }, 2000);
        }
        } else {
          this.displayDialog = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    }
  deleteData(rowData: any) {
    this.displayDialog = applicationConstants.TRUE;
    this.deleteId = rowData.id;
  }
    cancel() {
      this.displayDialog = applicationConstants.FALSE;
    }
}
