import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { IncorporationTypes } from './shared/incorporation-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { IncorporationTypesService } from './shared/incorporation-types.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-incorporation-types',
  templateUrl: './membership-incorporation-types.component.html',
  styleUrls: ['./membership-incorporation-types.component.css']
})
export class MembershipIncorporationTypesComponent implements OnInit {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  incorporationTypesModel: IncorporationTypes = new IncorporationTypes();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private incorporationTypesServices: IncorporationTypesService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) {

  }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'description', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.incorporationTypesServices.getAllIncorporationTypes().subscribe((data: any) => {
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

  addData() {
    this.router.navigate([MembershipConfigConstants.ADD_INCORPORATION_TYPE]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_INCORPORATION_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteIncorporationType(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.incorporationTypesServices.deleteIncorporationTypes(this.deleteId).subscribe(response => {
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
