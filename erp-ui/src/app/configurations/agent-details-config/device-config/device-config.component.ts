import { Component, OnInit } from '@angular/core';
import { DeviceConfig } from './shared/device-config.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { DeviceConfigService } from './shared/device-config.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { AGENTDETAILSCONFIGCONSTANTS } from '../agent-details-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit {

  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  deviceConfigModel: DeviceConfig = new DeviceConfig();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private deviceConfigService: DeviceConfigService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) { }

  ngOnInit() {
    this.columns = [
      { field: 'deviceName', header: 'AGENTDETAILSCONFIG.DEVICE_NAME' },
      { field: 'deviceModelNumber', header: 'AGENTDETAILSCONFIG.DEVICE_MODEL_NUMBER' },
      { field: 'deviceUniqueNumber', header: 'AGENTDETAILSCONFIG.DEVICE_UNIQUE_NUMBER' },
      // { field: 'description', header: 'ERP.DESCRIPTION' },
      { field: 'statusName', header: 'AGENTDETAILSCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.deviceConfigService.getAllDeviceConfig().subscribe((data: any) => {
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
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_DEVICE_CONFIG]);
  }

  editData(rowData: any) {
    this.router.navigate([AGENTDETAILSCONFIGCONSTANTS.ADD_DEVICE_CONFIG], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  delete() {
    this.commonComponent.startSpinner();
    this.deviceConfigService.deleteDeviceConfig(this.deleteId).subscribe(response => {
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
