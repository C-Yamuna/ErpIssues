import { Component } from '@angular/core';
import { CommonConfigConstants } from '../common-config-constants';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { DesignationTypes } from './shared/designation-types.model';
import { DesignationTypesService } from './shared/designation-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-designation-types',
  templateUrl: './designation-types.component.html',
  styleUrls: ['./designation-types.component.css']
})
export class DesignationTypesComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  designationTypesModel: DesignationTypes = new DesignationTypes();
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private designationTypesService: DesignationTypesService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) {

  }
  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'ERP.NAME' },
      { field: 'isCeo', header: 'ERP.CEO' },
      { field: 'statusName', header: 'ERP.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.designationTypesService.getAllDesignationTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
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

  addDesignationType() {
    this.router.navigate([CommonConfigConstants.ADD_DESIGNATION_TYPE]);
  }

  editDesignationType(rowData: any) {
    this.router.navigate([CommonConfigConstants.ADD_DESIGNATION_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    this.commonComponent.startSpinner();
    this.designationTypesService.deleteDesignationTypes(this.deleteId).subscribe(response => {
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