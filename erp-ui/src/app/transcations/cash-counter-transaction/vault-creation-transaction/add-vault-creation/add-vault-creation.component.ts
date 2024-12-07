import { Component } from '@angular/core';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CashCountertransactionconstant } from '../../cash-counter-transaction-constant';
import { Vaultcreation } from '../shared/vaultcreation.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { VaultCreationService } from '../shared/vault-creation.service';

@Component({
  selector: 'app-add-vault-creation',
  templateUrl: './add-vault-creation.component.html',
  styleUrls: ['./add-vault-creation.component.css']
})
export class AddVaultCreationComponent {
  vaultcreationform:FormGroup;
  statusList: any[] = [];
  vaultcreationModel: Vaultcreation = new Vaultcreation();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  orgnizationSetting:any;
  maxDate = new Date();

  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,
    private datePipe: DatePipe,private vaultcreationService: VaultCreationService
  ){
    this.vaultcreationform = this.formBuilder.group({
      pacsId: new FormControl('',),
      branchId: new FormControl('',),
      vaultName: new FormControl('',),
      effectiveStartDate: new FormControl('',[Validators.required]),
      effectiveEndDate: new FormControl('',[Validators.required]),

})
}
ngOnInit(): void {
  this.statusList = this.commonComponent.status();
  this.orgnizationSetting = this.commonComponent.orgnizationSettings()
  
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        // this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.vaultcreationService.getVaultCreationById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.vaultcreationModel = this.responseModel.data[0];
            if(this.vaultcreationModel.effectiveStartDate != null && this.vaultcreationModel.effectiveStartDate != undefined &&this.vaultcreationModel.effectiveEndDate!=null&&this.vaultcreationModel.effectiveEndDate!= undefined){
              this.vaultcreationModel.effStartDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveStartDate, this.orgnizationSetting.datePipe);
              this.vaultcreationModel.effEndDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveEndDate, this.orgnizationSetting.datePipe);
            }
          }
        });
      } else {
        this.isEdit = false;
        this.vaultcreationModel.status = this.statusList[0].value;
      }
    })
    this.orgnizationSetting = this.commonComponent.orgnizationSettings()
}
navigateToBack(){
  this.router.navigate([CashCountertransactionconstant.VAULT_CREATION_TRANSACTION]); 
}
addOrUpdate() {
  //this.commonComponent.startSpinner();
  if(this.vaultcreationModel.effStartDateVal != undefined && this.vaultcreationModel.effStartDateVal != null)
    this.vaultcreationModel.effectiveStartDate = this.commonfunctionservice.getUTCEpoch(new Date(this.vaultcreationModel.effStartDateVal));
    if(this.vaultcreationModel.effEndDateVal != undefined && this.vaultcreationModel.effEndDateVal != null)
    this.vaultcreationModel.effectiveEndDate = this.commonfunctionservice.getUTCEpoch(new Date(this.vaultcreationModel.effEndDateVal));
  if (this.isEdit) {
    this.vaultcreationService.updateVaultCreation(this.vaultcreationModel).subscribe((response: any) => {
      this.responseModel = response;
      
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaultcreationModel = response.data[0];

        if(null != this.vaultcreationModel.effectiveStartDate)
        this.vaultcreationModel.effStartDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveStartDate, this.orgnizationSetting.datePipe);
        if(null != this.vaultcreationModel.effectiveEndDate)
        this.vaultcreationModel.effEndDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveEndDate, this.orgnizationSetting.datePipe);
      
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
    this.vaultcreationService.addVaultCreation(this.vaultcreationModel).subscribe((response: any) => {
      this.responseModel = response;
      if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
        this.vaultcreationModel = response.data[0];
     
        if(this.vaultcreationModel.effectiveStartDate != null && this.vaultcreationModel.effectiveStartDate != undefined &&this.vaultcreationModel.effectiveEndDate!=null&&this.vaultcreationModel.effectiveEndDate!= undefined){
            this.vaultcreationModel.effStartDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveStartDate, this.orgnizationSetting.datePipe);
            this.vaultcreationModel.effEndDateVal=this.datePipe.transform(this.vaultcreationModel.effectiveEndDate, this.orgnizationSetting.datePipe);
          }
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
