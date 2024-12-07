import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { OperatorType } from './shared/operator-type.model';
import { Router } from '@angular/router';
import { OperatorTypeService } from './shared/operator-type.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../common-config-constants';

@Component({
  selector: 'app-operator-type',
  templateUrl: './operator-type.component.html',
  styleUrls: ['./operator-type.component.css']
})
export class OperatorTypeComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[]=[];
  displayDialog: boolean = false;
  operationTypesModel:OperatorType = new OperatorType();
  deleteId:any;
  constructor(private router: Router,
    private operatorTypeService:OperatorTypeService,
    private encryptDecryptService :EncryptDecryptService,
    private commonComponent: CommonComponent){ }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
    this.getAll();
  }

  getAll(){
    this.commonComponent.startSpinner();
    this.operatorTypeService.getAllOperationTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.commonComponent.stopSpinner();
      } else {
        this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    },error => {
      this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
  });
}

  addData(){
    this.router.navigate([CommonConfigConstants.ADD_OPERATOR_TYPE]);
  }

  editData(rowData:any){
    this.router.navigate([CommonConfigConstants.ADD_OPERATOR_TYPE],{ queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  
  submit() {
    this.commonComponent.startSpinner();
    this.operatorTypeService.deleteOperationTypes(this.deleteId).subscribe(response => {
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
