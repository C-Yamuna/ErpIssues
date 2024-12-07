import { Component, OnInit } from '@angular/core';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { InvestedBankDetails } from '../shared/invested-bank-details.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { InvestedBankDetailsService } from '../shared/invested-bank-details.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { InvestmentsConfigConstants } from '../../investments-config-constants';

@Component({
  selector: 'app-add-invested-bank-details',
  templateUrl: './add-invested-bank-details.component.html',
  styleUrls: ['./add-invested-bank-details.component.css']
})
export class AddInvestedBankDetailsComponent implements OnInit{
  columns: any[] = [];
  msgs: any[] = [];
  gridListData: any[] = [];
  responseModel!: Responsemodel;
  statusList: any[] = [];
  investedBankDetailsModel: InvestedBankDetails = new InvestedBankDetails();
  displayDialog: boolean = false;
  investedBankDetailsForm: FormGroup;
  isEdit: any;
  buttonDisabled: any;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private encryptDecryptService: EncryptDecryptService,
    private activateRoute: ActivatedRoute,
    private commonComponent: CommonComponent,
    private investedBankDetailsService: InvestedBankDetailsService) {

    this.investedBankDetailsForm = this.formBuilder.group({
      'bankName':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'branchName': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'bankIfscCode': new FormControl('', [Validators.required , Validators.pattern(applicationConstants.IFSCNUMBER)]),
      'pocName': new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'pocNumber': new FormControl('', [Validators.required,Validators.pattern(applicationConstants.MOBILE_PATTERN)]),
      'pocEmail':new FormControl('', [Validators.required,Validators.pattern(applicationConstants.NEW_EMAIL_PATTERN),]),
      'bankAddress': new FormControl('', ),
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
        this.investedBankDetailsService.getInvestedBankDetailsById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.investedBankDetailsModel = this.responseModel.data[0];
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
        this.investedBankDetailsModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.investedBankDetailsService.updateInvestedBankDetails(this.investedBankDetailsModel).subscribe((response: any) => {
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
      this.investedBankDetailsService.addInvestedBankDetails(this.investedBankDetailsModel).subscribe((response: any) => {
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
    this.router.navigate([InvestmentsConfigConstants.INVESTED_BANK_DETAILS]);
  }
}
