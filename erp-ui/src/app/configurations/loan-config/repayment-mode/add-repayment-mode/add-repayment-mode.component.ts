import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanConfigConstants } from '../../loan-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { RepaymentFrequencyService } from '../shared/repayment-frequency.service';
import { RepaymentFrequency } from '../shared/repayment-frequency.model';

@Component({
  selector: 'app-add-repayment-mode',
  templateUrl: './add-repayment-mode.component.html',
  styleUrls: ['./add-repayment-mode.component.css']
})
export class AddRepaymentModeComponent implements OnInit{
  cities: any[] | undefined;
  repaymentmodeform: FormGroup;
  repaymentFrequencyModel: RepaymentFrequency = new RepaymentFrequency();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  statusList: any[] = [];

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent, private repaymentFrequencyService: RepaymentFrequencyService )
  { 
    this.repaymentmodeform = this.formBuilder.group({
      'name':new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    })
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.repaymentFrequencyService.getRepaymentModeById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data && this.responseModel.data.length > 0) {
            this.repaymentFrequencyModel = this.responseModel.data[0];
          }
        }
        });
      } else {
        this.isEdit = false;
        if (this.statusList && this.statusList.length > 0) {
          this.repaymentFrequencyModel.status = this.statusList[0].value;
        }
      
      }
    })
}

navigateToBack(){
    this.router.navigate([LoanConfigConstants.REPAYMENT_MODE]);   
  }
  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.repaymentFrequencyService.updateRepaymentMode(this.repaymentFrequencyModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
            this.navigateToBack();
          }, 1000);
        } else {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        });
    } else {
      this.repaymentFrequencyService.addRepaymentMode(this.repaymentFrequencyModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
            this.navigateToBack();
          }, 1000);
        } else {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        }
      },
        error => {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
          }, 1000);
        });
    }
  }
}
