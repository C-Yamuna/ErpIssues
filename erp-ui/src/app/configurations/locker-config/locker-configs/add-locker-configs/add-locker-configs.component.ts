import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { LockerConfig } from '../locker-config.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { LockerConfigService } from '../locker-config.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LockerConfigConstants } from '../../locker-config-constants';
import { DatePipe } from '@angular/common';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';

@Component({
  selector: 'app-add-locker-configs',
  templateUrl: './add-locker-configs.component.html',
  styleUrls: ['./add-locker-configs.component.css']
})
export class AddLockerConfigsComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  lockerConfigModel: LockerConfig = new LockerConfig();
  displayDialog: boolean = false;
  lockerconfigform: FormGroup;
  isEdit: any;
  buttonDisabled: any;
  lockerlist: any[] = [];
  orgnizationSetting: any;
  isSecurityRequired: boolean = false;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private lockerConfigService:LockerConfigService,
    private datePipe: DatePipe,private commonFunctionsService: CommonFunctionsService,) {

    this.lockerconfigform = this.formBuilder.group({
      'lockerType':new FormControl('', [Validators.required]),
      'lockerSize': new FormControl('', [Validators.required]),
      'lockerNumber': new FormControl('', [Validators.required]),
      'lockerSerialNumber':new FormControl('', [Validators.required]),
      'keyNumber': new FormControl('', [Validators.required]),
      'keySerialNumber': new FormControl('', [Validators.required]),
      'lockerRent':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS)]),
      'latePaymentPenaltyType': new FormControl('', ),
      'rentPaymentFrequency': new FormControl('', ),
      'noOfFreeVisits':new FormControl('', ),
      'extraVisitPayment':new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),]),
      'brokenPeriodInMonths': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),]),
      'breakingCharges':new FormControl('', ),
      'nonMaintainanceAlertDays': new FormControl('', ),
      'surrenderCharges': new FormControl('', [Validators.pattern(applicationConstants.ALLOW_TWO_DECIMALS),]),
      'isSecurityRequired':new FormControl('', ),
      'cgst': new FormControl('',[ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'sgst': new FormControl('',[ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'igst': new FormControl('',[ Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'effectiveStartDate':new FormControl('', [Validators.required]),
      'description': new FormControl('', ),
      'statusName': new FormControl('', [Validators.required])
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.lockerlist = this.commonComponent.lockerType();
    this.orgnizationSetting = this.commonComponent.orgnizationSettings();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.isEdit = true;
        this.lockerConfigService.getLockerConfigById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.lockerConfigModel = this.responseModel.data[0];
            if (this.lockerConfigModel.effectiveStartDate) {
              this.lockerConfigModel.effectiveStartDate = this.datePipe.transform(this.lockerConfigModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            }
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.lockerConfigModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if( this.lockerConfigModel.isSecurityRequired == null &&  this.lockerConfigModel.isSecurityRequired == undefined)
      this.lockerConfigModel.isSecurityRequired = false;
    if (this.lockerConfigModel.effectiveStartDate) {
      this.lockerConfigModel.effectiveStartDate = this.commonFunctionsService.getUTCEpoch(new Date(this.lockerConfigModel.effectiveStartDate));
    }
    if (this.isEdit) {
      this.lockerConfigService.updateLockerConfig(this.lockerConfigModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.lockerConfigService.addLockerConfig(this.lockerConfigModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }
  navigateToBack() {
    this.router.navigate([LockerConfigConstants.LOCKER_CONFIG]);
  }
  onSelectCheckBox(event: any) {
    this.isSecurityRequired = event.checked;
    if (this.isSecurityRequired) {
      this.lockerConfigModel.isSecurityRequired = true;
    
    
      if (this.isSecurityRequired) {
        this.lockerConfigModel.isSecurityRequired = true;
      
        this.lockerconfigform.get('isSecurityRequired')?.setValidators(null);
        this.lockerconfigform.get('isSecurityRequired')?.updateValueAndValidity();
      } else {
        this.lockerConfigModel.isSecurityRequired = false;
      
        this.lockerconfigform.get('isSecurityRequired')?.setValidators([Validators.required]);
        this.lockerconfigform.get('isSecurityRequired')?.updateValueAndValidity();
      }
    
    }
  }
}
