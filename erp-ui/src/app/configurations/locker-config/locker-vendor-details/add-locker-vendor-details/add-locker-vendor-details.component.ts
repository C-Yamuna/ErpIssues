import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { LockerVendorDetails } from '../shared/locker-vendor-details.model';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { LockerVendorDetailsService } from '../shared/locker-vendor-details.service';
import { LockerConfigConstants } from '../../locker-config-constants';

@Component({
  selector: 'app-add-locker-vendor-details',
  templateUrl: './add-locker-vendor-details.component.html',
  styleUrls: ['./add-locker-vendor-details.component.css']
})
export class AddLockerVendorDetailsComponent {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  lockerVendorDetailsModel: LockerVendorDetails = new LockerVendorDetails();
  displayDialog: boolean = false;
  lockervendorform: FormGroup;
  isEdit: any;
  buttonDisabled: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private lockerVendorDetailsService:LockerVendorDetailsService) {

    this.lockervendorform = this.formBuilder.group({
      'vendorName':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'vendorPOCName': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'vendorPOCNumber': new FormControl('', [Validators.required ,  Validators.pattern(applicationConstants.MOBILE_PATTERN)]),
      'vendorPOCEmail':new FormControl('', [Validators.pattern(applicationConstants.NEW_EMAIL_PATTERN),]),
      'vendorAddress': new FormControl('', ),
      'description': new FormControl('', ),
      'statusName': new FormControl('', [Validators.required])
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.isEdit = true;
        this.lockerVendorDetailsService.getLockerVendorDetailsById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.lockerVendorDetailsModel = this.responseModel.data[0];
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
        this.lockerVendorDetailsModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.lockerVendorDetailsService.updateLockerVendorDetails(this.lockerVendorDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    } else {
      this.lockerVendorDetailsService.addLockerVendorDetails(this.lockerVendorDetailsModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.buttonDisabled = applicationConstants.FALSE;
        });
    }
  }

  navigateToBack() {
    this.router.navigate([LockerConfigConstants.LOCKER_VENDOR_DETAILS]);
  }
}
