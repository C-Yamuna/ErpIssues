import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { ServiceTypes } from '../shared/service-types.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { ServiceTypesService } from '../shared/service-types.service';
import { DailyDepositConfigConstants } from '../../daily-deposit-config-constants';

@Component({
  selector: 'app-add-service-types',
  templateUrl: './add-service-types.component.html',
  styleUrls: ['./add-service-types.component.css']
})
export class AddServiceTypesComponent {
  cities: any[] = [];
  servicetypeForm:FormGroup;
  statusList: any[] = [];
  serviceTypesModel: ServiceTypes = new ServiceTypes();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private serviceTypesService: ServiceTypesService,
  ){
    this.servicetypeForm = this.formBuilder.group({
      'name':new FormControl('', [Validators.required, Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS)]),
      'cgstPercentage': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
      'sgstPercentage': new FormControl('',[Validators.required, Validators.pattern(applicationConstants.RATE_OF_INTERST)]),
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
      this.serviceTypesService.getServiceTypesById(id).subscribe(res => {
        this.responseModel = res;
        // this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data && this.responseModel.data.length > 0) {
          this.serviceTypesModel = this.responseModel.data[0];
        }
      }
      });
    } else {
      this.isEdit = false;
      if (this.statusList && this.statusList.length > 0) {
        this.serviceTypesModel.status = this.statusList[0].value;
      }
    
    }
  })
}
navigateToBack(){
  this.router.navigate([DailyDepositConfigConstants.SERVICE_TYPES]); 
}
//add and update service type
//@vinitha
addOrUpdateServiceTypes() {
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.serviceTypesService.updateServiceTypes(this.serviceTypesModel).subscribe((response: any) => {
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
    this.serviceTypesService.addServiceTypes(this.serviceTypesModel).subscribe((response: any) => {
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
