import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonConfigConstants } from '../../common-config-constants';
import { DenominationTypes } from '../shared/denomination-types.model';
import { DenominationTypesService } from '../shared/denomination-types.service';

@Component({
  selector: 'app-add-denomination-types',
  templateUrl: './add-denomination-types.component.html',
  styleUrls: ['./add-denomination-types.component.css']
})
export class AddDenominationTypesComponent {
  denominationform:FormGroup;
  statusList: any[] = [];
  denominationModel: DenominationTypes = new DenominationTypes();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  stateListData: any[] = [];
  // selectedCity: City | undefined;
  iscoin: boolean = false;
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private denominationTypesService: DenominationTypesService,
  ){
    this.denominationform = this.formBuilder.group({
      name:new FormControl('',[Validators.required]),
      value: new FormControl('', [Validators.pattern(applicationConstants.ALLOW_NUMBERS_ONLY),Validators.required]),
      description: new FormControl('',),
      status: new FormControl('',[Validators.required]),
      iscoin: new FormControl('',),

})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.denominationTypesService.getDenominationById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.denominationModel = this.responseModel.data[0];
          }
        });
      } else {
        this.isEdit = false;
        this.denominationModel.status = this.statusList[0].value;
      }
    })
  
}
navigateToBack(){
  this.router.navigate([CommonConfigConstants.DENOMINATION_TYPES]); 
}
addOrUpdate() {
  if( this.denominationModel.isCoin == null &&  this.denominationModel.isCoin == undefined)
    this.denominationModel.isCoin = false;
  //this.commonComponent.startSpinner();
  if (this.isEdit) {
    this.denominationTypesService.updateDenomination(this.denominationModel).subscribe((response: any) => {
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
    this.denominationTypesService.addDenomination(this.denominationModel).subscribe((response: any) => {
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
onSelectCheckBox(event: any) {
  this.iscoin = event.checked;
  if (this.iscoin) {
    this.denominationModel.isCoin = true;
  
  
    if (this.iscoin) {
      this.denominationModel.isCoin = true;
    
      this.denominationform.get('iscoin')?.setValidators(null);
      this.denominationform.get('iscoin')?.updateValueAndValidity();
    } else {
      this.denominationModel.isCoin = false;
    
      this.denominationform.get('iscoin')?.setValidators([Validators.required]);
      this.denominationform.get('iscoin')?.updateValueAndValidity();
    }
  
  }
}
}