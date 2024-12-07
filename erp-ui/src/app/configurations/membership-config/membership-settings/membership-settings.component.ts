import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipConfigConstants } from '../membership-config-constants';
import { Settings } from './shared/settings.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SettingsService } from './shared/settings.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-settings',
  templateUrl: './membership-settings.component.html',
  styleUrls: ['./membership-settings.component.css']
})
export class MembershipSettingsComponent implements OnInit {

  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  settingsModel: Settings = new Settings();
  responseModel!: Responsemodel;
  statusList: any[] = [];
  displayDialog: boolean = false;
  deleteId: any;

  constructor(private router: Router,
    private settingsService: SettingsService,
    private encryptDecryptService: EncryptDecryptService,
    private commonComponent: CommonComponent) {

  }

  ngOnInit() {
    this.columns = [
      { field: 'key', header: 'MEMBERSHIPCONFIG.KEY' },
      { field: 'value', header: 'MEMBERSHIPCONFIG.VALUE' },
      { field: 'prefix', header: 'MEMBERSHIPCONFIG.PREFIX' },
      { field: 'suffix', header: 'MEMBERSHIPCONFIG.SUFFIX' },
      { field: 'seqNumber', header: 'MEMBERSHIPCONFIG.SEQUENCE_NUMBER' },
      { field: 'statusName', header: 'MEMBERSHIPCONFIG.STATUS' },
    ];
    this.getAll();
  }

  getAll() {
    this.commonComponent.startSpinner();
    this.settingsService.getAllSettings().subscribe((data: any) => {
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
    this.router.navigate([MembershipConfigConstants.ADD_SETTING]);
  }

  editData(rowData: any) {
    this.router.navigate([MembershipConfigConstants.ADD_SETTING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteSetting(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  delete() {
    this.displayDialog = false;
    this.getAll();
    this.commonComponent.startSpinner();
    this.settingsService.deleteSettings(this.deleteId).subscribe(response => {
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
