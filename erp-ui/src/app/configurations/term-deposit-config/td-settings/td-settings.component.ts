import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TERMDEPOSITCONFIGCONSTANTS } from '../term-deposit-config-constants';
import { SettingsService } from './shared/settings.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonConfigConstants } from '../../common-config/common-config-constants';
import { Settings } from './shared/settings.model';
import { CommonComponent } from 'src/app/shared/common.component';

@Component({
  selector: 'app-td-settings',
  templateUrl: './td-settings.component.html',
  styleUrls: ['./td-settings.component.css']
})
export class TdSettingsComponent implements OnInit{
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
      { field: 'key', header: 'TERMDEPOSITS.KEY' },
      { field: 'value', header: 'TERMDEPOSITS.VALUE' },
      { field: 'prefix', header: 'TERMDEPOSITS.PREFIX' },
      { field: 'suffix', header: 'TERMDEPOSITS.SUFFIX' },
      { field: 'seqNumber', header: 'TERMDEPOSITS.SEQUENCE_NUMBER' },
      { field: 'statusName', header: 'TERMDEPOSITS.STATUS' },
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
    this.router.navigate([TERMDEPOSITCONFIGCONSTANTS.ADD_SETTING]);
  }
  deleteSetting(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }
  editData(rowData: any) {
    this.router.navigate([TERMDEPOSITCONFIGCONSTANTS.ADD_SETTING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }
  delete() {
    // this.commonComponent.startSpinner();
    this.settingsService.deleteSettings(this.deleteId).subscribe(response => {
      this.responseModel = response;
      this.msgs = [];
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        // this.commonComponent.stopSpinner();
        this.displayDialog = false;
        this.msgs = [];
        this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.getAll();
        }, 2000);
      } else {
        this.displayDialog = false;
        // this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    }, error => {
      // this.commonComponent.stopSpinner();
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
