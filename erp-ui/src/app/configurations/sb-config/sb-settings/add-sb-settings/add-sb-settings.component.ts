import { Component } from '@angular/core';
import { SavingsBankConfigConstants } from '../../sb-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SbSettingsModel } from '../shared/sb-settings-model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { SbSettingService } from '../shared/sb-setting.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';

@Component({
  selector: 'app-add-sb-settings',
  templateUrl: './add-sb-settings.component.html',
  styleUrls: ['./add-sb-settings.component.css']
})
export class AddSbSettingsComponent {
  sbSettingsForm: any;
  statusList: any[] = [];
  msgs: any[] = [];
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  sbSettingsModel : SbSettingsModel = new SbSettingsModel();

  
  constructor(private router:Router, private formBuilder:FormBuilder ,private commonComponent : CommonComponent ,
    private sbSettingService :SbSettingService ,private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService){
    this.sbSettingsForm = this.formBuilder.group({
      key: new FormControl('',[Validators.required]),
      settingsValue: new FormControl('',[Validators.required]),
      prefix: new FormControl('',),
      suffix: new FormControl('',),
      seqNumber: new FormControl('',),
      statusName:new FormControl('',[Validators.required]),
    });

  }

  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.sbSettingService.getSettings(id).subscribe(res => {
          this.isEdit = true;
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.sbSettingsModel = this.responseModel.data[0];
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              // this.navigateToBack();
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.sbSettingsModel.status = this.statusList[0].value;
      }
    }),
      (error: any) => {
      this.msgs = [];
      this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  }
  navigateToBack(){
    this.router.navigate([SavingsBankConfigConstants.SETTINGS]);
  }
  submit(){
    this.sbSettingService.addSettings(this.sbSettingsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateToBack();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
  update(){
    this.sbSettingService.updateSettings(this.sbSettingsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
          this.navigateToBack();
        }, 2000);
      } else {
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      }
    });
  }
}
