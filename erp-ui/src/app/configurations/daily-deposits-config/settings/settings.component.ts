import { Component } from '@angular/core';
import { Settings } from './shared/settings.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SettingsService } from './shared/settings.service';
import { DailyDepositConfigConstants } from '../daily-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  products: [] = [];
  columns: any[] = [];
  gridListData: any[] = [];
  tempGridListData: any[] = [];
  msgs: any[] = [];
  gridListLength: Number | undefined;
  settingsModel: Settings = new Settings();
  displayDialog: boolean = false;
  responseModel!: Responsemodel;
  deleteId:any;
  constructor(private router: Router, private settingsService: SettingsService,
    private encryptDecryptService: EncryptDecryptService,
  ) {
    this.columns = [
      { field: 'settingsKey', header: 'DAILYDEPOSITSCONFIG.KEY' },
      { field: 'settingsValue', header: 'DAILYDEPOSITSCONFIG.VALUE' },
      { field: 'prefix', header: 'DAILYDEPOSITSCONFIG.PREFIX' },
      { field: 'suffix', header: 'DAILYDEPOSITSCONFIG.SUFFIX' },
      { field: 'seqNumber', header: 'DAILYDEPOSITSCONFIG.SEQUENCE_NUMBER' },
      { field: 'statusName', header: 'DAILYDEPOSITSCONFIG.STATUS' },
    ];

  }
  ngOnInit(): void {
    this.getAll();
  }
  addsettings() {
    this.router.navigate([DailyDepositConfigConstants.ADD_SETTING]);
  }
  getAll() {
    this.settingsService.getAllSettings().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridListData = this.responseModel.data;
      } else {
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    });
  }

  editsettings(rowData: any) {
    this.router.navigate([DailyDepositConfigConstants.ADD_SETTING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }

  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
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
