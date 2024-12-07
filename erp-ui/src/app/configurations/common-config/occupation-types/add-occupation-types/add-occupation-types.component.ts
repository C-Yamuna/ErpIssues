import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConfigConstants } from '../../common-config-constants';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { Occupationtypes } from '../shared/occupationtypes.model';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { CommonFunctionsService } from 'src/app/shared/commonfunction.service';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { OccupationTypesService } from '../shared/occupation-types.service';

@Component({
  selector: 'app-add-occupation-types',
  templateUrl: './add-occupation-types.component.html',
  styleUrls: ['./add-occupation-types.component.css']
})
export class AddOccupationTypesComponent implements OnInit{

  occupationtypeform: FormGroup;
  statusList: any[] = [];
  occupationtypeModel: Occupationtypes = new Occupationtypes();
  responseModel!: Responsemodel;
  msgs: any[] = [];
  isEdit: any;
  constructor(private router:Router, private formBuilder:FormBuilder,
    private commonfunctionservice : CommonFunctionsService,private activateRoute: ActivatedRoute,
    private encryptService: EncryptDecryptService,private commonComponent: CommonComponent,private occupationtypeService: OccupationTypesService,
  ){
    this.occupationtypeform = this.formBuilder.group({
      name: new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      description: new FormControl('',),
      status: new FormControl('',[Validators.required]),
     

})
}
  ngOnInit() {
    this.statusList = this.commonComponent.status();
  this.activateRoute.queryParams.subscribe(params => {
    if (params['id'] != undefined) {
      // this.commonComponent.startSpinner();
      let id = this.encryptService.decrypt(params['id']);
      this.isEdit = true;
      this.occupationtypeService.getOccupationTypesById(id).subscribe(res => {
        this.responseModel = res;
        // this.commonComponent.stopSpinner();
        if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
          if (this.responseModel.data && this.responseModel.data.length > 0) {
          this.occupationtypeModel = this.responseModel.data[0];
        }
      }
      });
    } else {
      this.isEdit = false;
      if (this.statusList && this.statusList.length > 0) {
        this.occupationtypeModel.status = this.statusList[0].value;
      }
    
    }
  })
}

  navigateback(){
    this.router.navigate([CommonConfigConstants.OCCUPATIOON_TYPES]);   
  }
  addOrUpdate() {
    //this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.occupationtypeService.updateOccupationTypes(this.occupationtypeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          //this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
            this.navigateback();
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
      this.occupationtypeService.addOccupationTypes(this.occupationtypeModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          // this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];  
            this.navigateback();
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
