import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { LandUom } from './shared/land-uom.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { UomService } from './shared/uom.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-uom',
  templateUrl: './membership-uom.component.html',
  styleUrls: ['./membership-uom.component.css']
})
export class MembershipUomComponent implements OnInit {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  uomModel: LandUom = new LandUom();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private uomService: UomService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

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
    this.uomService.getAllUom().subscribe((data: any) => {
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
    this.router.navigate([MembershipConfigConstants.ADD_UOM]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_UOM], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteUom(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.uomService.deleteUom(this.deleteId).subscribe(response => {
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
