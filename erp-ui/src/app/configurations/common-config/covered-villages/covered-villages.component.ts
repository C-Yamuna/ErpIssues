import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CoveredVillages } from './shared/covered-villages.model';
import { Router } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
// import { ActivityService } from '../../membership-config/membership-activity/shared/activity.service';
import { MembershipConfigConstants } from '../../membership-config/membership-config-constants';
import { CoveredVillagesService } from './shared/covered-villages.service';
import { CommonConfigConstants } from '../common-config-constants';

@Component({
  selector: 'app-covered-villages',
  templateUrl: './covered-villages.component.html',
  styleUrls: ['./covered-villages.component.css']
})
export class CoveredVillagesComponent {
  columns: any[] = [];
  subColumns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  displayDialog: boolean = false;
  coverVillagesModel:CoveredVillages= new CoveredVillages();
  deleteId:any
  pacsId=1;
  tempGridListData: any;
  coveredvillagesgridlist:any;
  constructor(private router: Router,
    // private activityService:ActivityService, 
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent,
    private coveredVillagesService:CoveredVillagesService){ }

  ngOnInit() {
    this.columns = [
      { field: 'pacsName', header: 'ERP.PACS' },
      // { field: 'villageName', header: 'ERP.VILLAGES' },
      // { field: 'pinCode', header: 'ERP.PINCODE' },
      // { field: 'statusName', header: 'ERP.STATUS' },
    ];
    this.subColumns = [
     
      { field: 'stateName', header: 'ERP.STATES' },
      { field: 'districtName', header: 'ERP.DISTRICTS' },
      { field: 'subDistrictName', header: 'ERP.MANDAL' },
      { field: 'villageName', header: 'ERP.VILLAGES' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
    
    this.getAllCoveredByPacsId();
  }

  // getAllCoveredByPacsId() {
  //   this.coveredVillagesService.getAllCoveredVillagesByPacId(this.pacsId).subscribe((data: any) => {
  //     this.responseModel = data;
  //     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
  //       this.gridListData = this.responseModel.data;
  //       this.coveredvillagesgridlist = this.gridListData.filter((coveredvillages: any) => coveredvillages.isParent);
  //       this.tempGridListData =  this.coveredvillagesgridlist.filter((data :any) => data != null ).map((count:any) => {
  //         count.tempGridListData = this.gridListData.filter(objTwo => null != objTwo && objTwo.parentId == count.id);
  //         return count;
  //       })
  //       this.commonComponent.stopSpinner();
  //     } else {
  //       this.commonComponent.stopSpinner();
  //       this.msgs = [];
  //       this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
  //     }
  //   }, error => {
  //     this.commonComponent.stopSpinner();
  //     this.msgs = [];
  //     this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  //   });
  // }
  
  getAllCoveredByPacsId() {
    this.commonComponent.startSpinner();
   this.coveredVillagesService.getAllCoveredVillages().subscribe((data: any) => {
     this.responseModel = data;
     if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
      this.tempGridListData = this.responseModel.data;
      this.commonComponent.stopSpinner();
     }
      this.commonComponent.stopSpinner();
   }, error => {
     this.msgs = [];
     this.msgs = [{ severity: "error", summary: 'Failed', detail:  applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
     this.commonComponent.stopSpinner();
   });
 }
 
  addData(){
    this.router.navigate([CommonConfigConstants.ADD_COVERED_VILLAGES]);
  }

  editData(rowData:any){
    this.router.navigate([CommonConfigConstants.ADD_COVERED_VILLAGES],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  
  submit() {
    this.commonComponent.startSpinner();
    this.coveredVillagesService.deleteCoveredVillages(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAllCoveredByPacsId();
        }, 2000);
      } else {
        this.displayDialog = false;
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
  cancel() {
    this.displayDialog = false;
  }
}
