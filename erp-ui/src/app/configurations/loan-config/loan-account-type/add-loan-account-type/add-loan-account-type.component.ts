import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanConfigConstants } from '../../loan-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { LoanAccountType } from '../shared/loan-account-type.model';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { LoanAccountTypeService } from '../shared/loan-account-type.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-add-loan-account-type',
  templateUrl: './add-loan-account-type.component.html',
  styleUrls: ['./add-loan-account-type.component.css']
})
export class AddLoanAccountTypeComponent implements OnInit{
  accountTypeForm:FormGroup;
  accountType:any;
  statusList: any[] = [];
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[]= [];
  buttonDisabled: any;
  loanAccountTypeModel : LoanAccountType = new LoanAccountType();
  constructor(private router:Router, private formBuilder:FormBuilder,private commonComponent : CommonComponent  ,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,private loanAccountTypeService : LoanAccountTypeService){
    this.accountTypeForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    });

  }
  ngOnInit(): void {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.loanAccountTypeService.getLoanAccountTypeById(id).subscribe(res => {
          this.isEdit = true;
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.loanAccountTypeModel = this.responseModel.data[0];
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              this.navigateToBack();
            }, 2000);
          }
        });
      } else {
        this.loanAccountTypeModel.status = this.statusList[0].value;
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
    this.router.navigate([LoanConfigConstants.LOAN_ACCOUNT_TYPES]);
  }
  
  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.loanAccountTypeService.updateLoanAccountType(this.loanAccountTypeModel).subscribe((response: any) => {
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
      this.loanAccountTypeService.addLoanAccountType(this.loanAccountTypeModel).subscribe((response: any) => {
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
  
}
