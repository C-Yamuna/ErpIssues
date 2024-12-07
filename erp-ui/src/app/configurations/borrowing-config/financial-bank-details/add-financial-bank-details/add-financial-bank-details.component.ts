import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { BorrowingConfigConstants } from '../../borrowing-config-constants';
import { FinancialBankDetailsService } from '../shared/financial-bank-details.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { FinancialBankDetails } from '../shared/financial-bank-details.model';

@Component({
  selector: 'app-add-financial-bank-details',
  templateUrl: './add-financial-bank-details.component.html',
  styleUrls: ['./add-financial-bank-details.component.css']
})
export class AddFinancialBankDetailsComponent {
  financialbankdetailsform:FormGroup;
  statusList: any[] = [];
  financialBankDetailsModel: FinancialBankDetails = new FinancialBankDetails();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent, private financialBankDetailsService: FinancialBankDetailsService,
  ){
    this.financialbankdetailsform = this.formBuilder.group({
      bankname:  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      ifsccode: new FormControl('',[Validators.required, Validators.pattern(applicationConstants.IFSCNUMBER)]),
      branchName: new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      address: new FormControl('',),
      description: new FormControl('',),
      status: new FormControl('',[Validators.required]),
     

})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      // this.commonComponent.startSpinner();
      let id = this.encryptService.decrypt(params['id']);
      this.isEdit = true;
      this.financialBankDetailsService.getFinancialBankDetailsById(id).subscribe(res => {
        this.responseModel = res;
        // this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data && this.responseModel.data.length > 0) {
          this.financialBankDetailsModel = this.responseModel.data[0];
        }
      }
      });
    } else {
      this.isEdit = false;
      if (this.statusList && this.statusList.length > 0) {
        this.financialBankDetailsModel.status = this.statusList[0].value;
      }
    
    }
  })
}
navigateToBack(){
  this.router.navigate([BorrowingConfigConstants.FINANCIAL_BANK_DETAILS]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.financialBankDetailsService.updateFinancialBankDetails(this.financialBankDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
       // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  } else {
    this.financialBankDetailsService.addFinancialBankDetails(this.financialBankDetailsModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
          this.navigateToBack();
        }, 1000);
      } else {
        //this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      }
    },
      error => {
        // this.commonComponent.stopSpinner();
        this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];  
        }, 1000);
      });
  }
}
}
