import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { SbFormType } from '../shared/sb-form-type.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { SbFormTypeService } from '../shared/sb-form-type.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { SavingsBankConfigConstants } from '../../sb-config-constants';

@Component({
  selector: 'app-add-sb-form-type',
  templateUrl: './add-sb-form-type.component.html',
  styleUrls: ['./add-sb-form-type.component.css']
})
export class AddSbFormTypeComponent {
  sbformtypesform:FormGroup;
  statusList: any[] = [];
  sbFormTypeModel: SbFormType = new SbFormType();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  maxDate:any;
  orgnizationSetting:any;
  pacsId: any;
  // selectedCity: City | undefined;

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private sbFormTypeService: SbFormTypeService,
  ){
    this.sbformtypesform = this.formBuilder.group({
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      pacscode: new FormControl('',[Validators.required]),
      fileUpload: new FormControl(''),
      description: new FormControl(''),
      status: new FormControl('',[Validators.required]),


})
}
ngOnInit(): void {
  this.pacsId = 1;
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.sbFormTypeService.getSbFormTypeById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.sbFormTypeModel = this.responseModel.data[0];
          }
        });
      } else {
        this.isEdit = false;
        this.sbFormTypeModel.status = this.statusList[0].value;
      }
    })
  
}
navigateToBack(){
  this.router.navigate([SavingsBankConfigConstants.FORM_TYPES]); 
}
addOrUpdate() {
  this.sbFormTypeModel.pacsId = this.pacsId;
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.sbFormTypeService.updateSbFormType(this.sbFormTypeModel).subscribe((response: any) => {
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
    this.sbFormTypeService.addSbFormType(this.sbFormTypeModel).subscribe((response: any) => {
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
