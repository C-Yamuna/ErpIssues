import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SbSettingService } from './shared/sb-setting.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { SavingsBankConfigConstants } from '../sb-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-sb-settings',
  templateUrl: './sb-settings.component.html',
  styleUrls: ['./sb-settings.component.css']
})
export class SbSettingsComponent {

  sbSettings: any;
  destinationAccountType:any;
  gridListstatusList: any[] = [];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  gridList: any[] = [];
  id :  any;
  displayDialog: boolean = false;
  deleteId:any;
  constructor(private router:Router  ,private sbSettingService : SbSettingService , private commonComponent : CommonComponent  ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService){
    this.sbSettings = [
      { field: 'settingsKey', header: 'Key'},
      { field: 'settingsValue', header: 'Settings Value' },
      { field: 'prefix', header: 'Prefix' },
      { field: 'suffix', header: 'Suffix' },
      { field: 'seqNumber', header: 'Seqence Number' },
      { field: 'statusName', header: 'Status' },
    ];
  }
  ngOnInit(): void {
    this.getAll();
  }
  navigateToAdd(){
    this.router.navigate([SavingsBankConfigConstants.ADD_SETTING]);
  }
  navigateToEdit(rowData:any){
    this.router.navigate([SavingsBankConfigConstants.ADD_SETTING], { queryParams: { id: this.encryptDecryptService.encrypt(rowData.id) } });
  }



  getAll() {
    // this.commonComponent.startSpinner();
    this.sbSettingService.getAllSettings().subscribe((data: any) => {
      this.responseModel = data;
      if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
        this.gridList = this.responseModel.data;
        // this.commonComponent.stopSpinner();
      } else {
        // this.commonComponent.stopSpinner();
        this.msgs = [];
        this.msgs = [{ severity: 'error', detail: this.responseModel.statusMsg }];
      }
    }, error => {
      // this.commonComponent.stopSpinner();
      this.msgs = [];
      this.msgs = [{ severity: "error", summary: 'Failed', detail: applicationConstants.WE_COULDNOT_PROCESS_YOU_ARE_REQUEST }];
    });
  }
  deleteData(rowData: any) {
    this.displayDialog = true;
    this.deleteId = rowData.id;
  }

  submit() {
    // this.commonComponent.startSpinner();
    this.sbSettingService.deleteSettings(this.deleteId).subscribe(response => {
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
