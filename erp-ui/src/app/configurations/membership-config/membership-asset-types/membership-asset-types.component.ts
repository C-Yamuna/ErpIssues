import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { CommonComponent } from 'src/app/shared/common.component';
import { AssetTypesService } from './shared/asset-types.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { AssetTypes } from './shared/asset-types.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-membership-asset-types',
  templateUrl: './membership-asset-types.component.html',
  styleUrls: ['./membership-asset-types.component.css']
})
export class MembershipAssetTypesComponent implements OnInit {
  columns: any[] = [];
  responseModel !: Responsemodel;
  gridListData: any[] = [];
  msgs: any[] = [];
  assetTypesModel: AssetTypes = new AssetTypes();
  displayDialog: boolean = false;
  subColumns: any[] = [];
  assetGridListData:any;
  tempAssetGridListData:any;
  deleteId: any;
  buttonDisabled: any;

  constructor(private router: Router,
    private commonComponent: CommonComponent,
    private assetTypesService: AssetTypesService,
    private encryptDecryptService: EncryptDecryptService,) { }

  ngOnInit() {
    this.columns = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'isParent', header: 'MEMBERSHIPCONFIG.IS_PARENT' },
      { field: 'description', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
      // { field: 'parentId', header: 'MEMBERSHIPCONFIG.PARENT' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' }
    ];
    this.subColumns = [
      { field: 'name', header: 'MEMBERSHIPCONFIG.NAME' },
      { field: 'description', header: 'MEMBERSHIPCONFIG.DESCRIPTION' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }
  getAll() {
    this.commonComponent.startSpinner();
    this.assetTypesService.getAllAssetTypes().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
        this.assetGridListData = this.gridListData.filter((assetType: any) => assetType.isParent);
        this.tempAssetGridListData =  this.assetGridListData.filter((data :any) => data != null ).map((count:any) => {
          count.tempAssetGridListData = this.gridListData.filter(objTwo => null != objTwo && objTwo.parentId == count.id);
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
    this.router.navigate([MembershipConfigConstants.ADD_ASSET_TYPE]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_ASSET_TYPE], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteAssetType(rowData: any) {
    this.displayDialog = true;
   this.deleteId = rowData.id;
  }
  delete(){
    this.commonComponent.startSpinner();
    this.assetTypesService.deleteAssetTypes(this.deleteId).subscribe(response => {
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
