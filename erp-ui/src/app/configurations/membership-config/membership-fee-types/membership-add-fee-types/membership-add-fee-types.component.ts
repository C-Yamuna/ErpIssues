import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FeeTypes } from '../shared/fee-types.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { FeeTypeService } from '../shared/fee-type.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-add-fee-types',
  templateUrl: './membership-add-fee-types.component.html',
  styleUrls: ['./membership-add-fee-types.component.css']
})
export class MembershipAddFeeTypesComponent implements OnInit {
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  feeTypesModel: FeeTypes = new FeeTypes();
  displayDialog: boolean = false;
  feetypeform: FormGroup;
  isEdit: any;
  buttonDisabled: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private feeTypesService: FeeTypeService) {

    this.feetypeform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''),
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
        this.feeTypesService.getFeeTypeById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.feeTypesModel = this.responseModel.data[0];
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
        this.feeTypesModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.feeTypesModel.name =  this.feeTypesModel.name.trim();
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.feeTypesService.updateFeeType(this.feeTypesModel).subscribe((response: any) => {
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
      this.feeTypesService.addFeeType(this.feeTypesModel).subscribe((response: any) => {
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
    this.router.navigate([MembershipConfigConstants.FEE_TYPES]);
  }
}

