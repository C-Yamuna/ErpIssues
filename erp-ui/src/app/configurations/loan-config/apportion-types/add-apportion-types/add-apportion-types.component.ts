import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ApportionTypes } from '../shared/apportion-types.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ApportionTypesService } from '../shared/apportion-types.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { LoanConfigConstants } from '../../loan-config-constants';

@Component({
  selector: 'app-add-apportion-types',
  templateUrl: './add-apportion-types.component.html',
  styleUrls: ['./add-apportion-types.component.css']
})
export class AddApportionTypesComponent {
  apportiontypeForm:FormGroup;
  statusList: any[] = [];
  apportionTypesModel: ApportionTypes = new ApportionTypes();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  maxDate:any;
  orgnizationSetting:any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private apportionTypesService: ApportionTypesService,
  ){
    this.apportiontypeForm = this.formBuilder.group({
      'name':new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'apportionOrder':new FormControl('', [Validators.required],),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),

})
}
ngOnInit(): void {
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.apportionTypesService.getApportionTypesById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.apportionTypesModel = this.responseModel.data[0];
          }
        });
      } else {
        this.isEdit = false;
        this.apportionTypesModel.status = this.statusList[0].value;
      }
    })
  
}
navigateToBack(){
  this.router.navigate([LoanConfigConstants.APPORTION_TYPES]); 
}
addOrUpdate() {
  this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.apportionTypesService.updateApportionTypes(this.apportionTypesModel).subscribe((response: any) => {
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
    this.apportionTypesService.addApportionTypes(this.apportionTypesModel).subscribe((response: any) => {
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
