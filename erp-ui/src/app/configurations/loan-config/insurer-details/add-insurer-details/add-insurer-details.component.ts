import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LoanConfigConstants } from '../../loan-config-constants';
import { FormBuilder, FormControl, FormGroup, Validators,  } from '@angular/forms';
import { InsurerDetails } from '../shared/insurer-details.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { InsurerDetailsService } from '../shared/insurer-details.service';
@Component({
  selector: 'app-add-insurer-details',
  templateUrl: './add-insurer-details.component.html',
  styleUrls: ['./add-insurer-details.component.css']
})
export class AddInsurerDetailsComponent {
  insurerdetailsform:FormGroup;
  statusList: any[] = [];
  insurerDetailsModel: InsurerDetails = new InsurerDetails();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  maxDate:any;
  orgnizationSetting:any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private insurerDetailsService: InsurerDetailsService,
  ){
    this.insurerdetailsform = this.formBuilder.group({
      'name':new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'mobileNo': new FormControl('', [Validators.pattern(applicationConstants.MOBILE_PATTERN),]),
      'email': new FormControl('', [Validators.pattern(applicationConstants.EMAIL_PATTERN),]),
      'address': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),

})
}
ngOnInit(): void {
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.insurerDetailsService.getInsurerDetailsById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.insurerDetailsModel = this.responseModel.data[0];
          }
        });
      } else {
        this.isEdit = false;
         this.insurerDetailsModel.status = this.statusList[0].value;
      }
    })
  
}
navigateToBack(){
  this.router.navigate([LoanConfigConstants.INSURER_DETAILS]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.insurerDetailsService.updateInsurerDetails(this.insurerDetailsModel).subscribe((response: any) => {
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
    this.insurerDetailsService.addInsurerDetails(this.insurerDetailsModel).subscribe((response: any) => {
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