import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Division } from '../shared/division.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { DivisionService } from '../shared/division.service';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.css']
})
export class AddDivisionComponent implements OnInit{
  divisionform:FormGroup;
  accountTypes:any;
  statusList: any[] = [];
  divisionModel: Division = new Division();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,  private divisionService: DivisionService,
  ){
    this.divisionform = this.formBuilder.group({
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
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
        this.divisionService.getDivisionById(id).subscribe(res => {
          this.responseModel = res;
          // this.commonComponent.stopSpinner();
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            if (this.responseModel.data && this.responseModel.data.length > 0) {
            this.divisionModel = this.responseModel.data[0];
          }
        }
        });
      } else {
        this.isEdit = false;
        if (this.statusList && this.statusList.length > 0) {
          this.divisionModel.status = this.statusList[0].value;
        }
      
      }
    })
  }
  navigateToBack(){
    this.router.navigate([CommonConfigConstants.DIVISION]);  

  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.divisionService.updateDivision(this.divisionModel).subscribe((response: any) => {
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
      this.divisionService.addDivision(this.divisionModel).subscribe((response: any) => {
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
