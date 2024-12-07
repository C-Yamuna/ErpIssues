import { Component } from '@angular/core';
import { DailyDepositConfigConstants } from '../../daily-deposit-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reasons } from '../shared/reasons.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ReasonsService } from '../shared/reasons.service';

@Component({
  selector: 'app-add-reasons',
  templateUrl: './add-reasons.component.html',
  styleUrls: ['./add-reasons.component.css']
})
export class AddReasonsComponent {
  cities: any[] = [];
  addreasonform:FormGroup;
  statusList: any[] = [];
  reasonModel: Reasons = new Reasons();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private reasonService: ReasonsService,
  ){
    this.addreasonform = this.formBuilder.group({
      'name':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      // this.commonComponent.startSpinner();
      let id = this.encryptService.decrypt(params['id']);
      this.isEdit = true;
      this.reasonService.getReasonById(id).subscribe(res => {
        this.responseModel = res;
        // this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data && this.responseModel.data.length > 0) {
          this.reasonModel = this.responseModel.data[0];
        }
      }
      });
    } else {
      this.isEdit = false;
      if (this.statusList && this.statusList.length > 0) {
        this.reasonModel.status = this.statusList[0].value;
      }
    
    }
  })
}
navigateToBack(){
  this.router.navigate([DailyDepositConfigConstants.REASONS]); 
}
//add and update reasons
//@vinitha
addOrUpdateReasons() {
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.reasonService.updateReason(this.reasonModel).subscribe((response: any) => {
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
    this.reasonService.addReason(this.reasonModel).subscribe((response: any) => {
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
