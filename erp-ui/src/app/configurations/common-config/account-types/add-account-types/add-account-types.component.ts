import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { Accounttypes } from '../shared/accounttypes.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { AccountsTypesService } from '../shared/accounts-types.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-add-account-types',
  templateUrl: './add-account-types.component.html',
  styleUrls: ['./add-account-types.component.css']
})
export class AddAccountTypesComponent implements OnInit{
 
  accountTypesForm:FormGroup;
  accountTypes:any;
  statusList: any[] = [];
  accounttypesModel: Accounttypes = new Accounttypes();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent, private accounttypeService: AccountsTypesService,
  ){
    this.accountTypesForm = this.formBuilder.group({
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      description: new FormControl(''),
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
        this.accounttypeService.getAccountsTypesById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data && this.responseModel.data.length > 0) {
            this.accounttypesModel = this.responseModel.data[0];
          }
        }
        });
      } else {
        this.isEdit = false;
        if (this.statusList && this.statusList.length > 0) {
          this.accounttypesModel.status = this.statusList[0].value;
        }
      
      }
    })
  }
  navigateToBack(){
    this.router.navigate([CommonConfigConstants.ACCOUNT_TYPES]);  

  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.accounttypeService.updateAccountsTypes(this.accounttypesModel).subscribe((response: any) => {
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
      this.accounttypeService.addAccountsTypes(this.accounttypesModel).subscribe((response: any) => {
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