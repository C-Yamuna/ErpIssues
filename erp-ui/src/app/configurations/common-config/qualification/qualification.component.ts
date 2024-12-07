import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonConfigConstants } from '../common-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { QualificationService } from './shared/qualification.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Qualification } from './shared/qualification.model';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit{
  columns: any[] = [];
  responseModel !: Responsemodel;
  gridListData: any[] = [];
  msgs: any[] = [];
  qualificationModel: Qualification = new Qualification();
  displayDialog: boolean = false;
  subColumns: any[] = [];
  qualificationGridListData:any;
  tempQualificationGridListData:any;
  deleteId: any;

  constructor(private router: Router,
    private commonComponent: CommonComponent,
    private qualificationService: QualificationService,
    private encryptDecryptService: EncryptDecryptService,) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'isParent', header: 'ERP.IS_PARENT' },
   
      { field: 'statusName', header: 'ERP.STATUS' }
    ];
    this.subColumns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
    this.getAll();
  }
  getAll() {
    this.commonComponent.startSpinner();
    this.qualificationService.getAllQualification().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.qualificationGridListData = this.gridListData.filter((casteType: any) => casteType.isParent);
        this.tempQualificationGridListData =  this.qualificationGridListData.filter((data :any) => data != null ).map((count:any) => {
          count.tempQualificationGridListData = this.gridListData.filter(objTwo => null != objTwo && objTwo.parentId == count.id);
          return count;
        })
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }

  addData() {
    this.router.navigate([CommonConfigConstants.ADD_QUALIFICATION]);
  }

  editData(rowData: any) {
    this.router.navigate([CommonConfigConstants.ADD_QUALIFICATION], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
   this.deleteId = rowData.id;
  }
  submit(){
    this.commonComponent.startSpinner();
    this.qualificationService.deleteQualification(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
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
