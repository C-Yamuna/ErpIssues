import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipConfigConstants } from '../../membership-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { IrrigationTypes } from '../shared/irrigation-types.model';
import { IrrigationTypeService } from '../shared/irrigation-type.service';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';

@Component({
  selector: 'app-membership-add-irrigation-types',
  templateUrl: './membership-add-irrigation-types.component.html',
  styleUrls: ['./membership-add-irrigation-types.component.css']
})
export class MembershipAddIrrigationTypesComponent implements OnInit{

  irrigationtypeform: FormGroup;
  statusList: any[] = [];
  msgs: any[] = [];
  responseModel!: Responsemodel;
  buttonDisabled: any;
  isEdit: any;
  irrigationTypesModel: IrrigationTypes = new IrrigationTypes()


  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private irrigationTypesService: IrrigationTypeService,
    private activateRoute: ActivatedRoute,
    private commonComponent:CommonComponent,
    private encryptService: EncryptDecryptService,){ 
    this.irrigationtypeform = this.formBuilder.group({
      'name':  new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'discription': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    })
  }

  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        this.commonComponent.startSpinner();
        let id = this.encryptService.decrypt(params['id']);
        this.isEdit = true;
        this.irrigationTypesService.getIrrigationTypeById(id).subscribe(res => {
          this.responseModel = res;
          this.commonComponent.stopSpinner();
          if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
            this.irrigationTypesModel = this.responseModel.data[0];
          } else {
            this.commonComponent.stopSpinner();
            this.buttonDisabled = applicationConstants.FALSE;
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
            }, 2000);
          }
        });
      } else {
        this.isEdit = false;
        this.irrigationTypesModel.status = this.statusList[0].value;
      }
    })
  }

  addOrUpdate() {
    this.commonComponent.startSpinner();
    this.irrigationTypesModel.name =  this.irrigationTypesModel.name.trim();
    if (this.isEdit) {
      this.irrigationTypesService.updateIrrigationType(this.irrigationTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        });
    } else {
      this.irrigationTypesService.addIrrigationType(this.irrigationTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs =[{ severity: 'success',summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      },error => {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
          this.buttonDisabled = applicationConstants.FALSE;
        });
    }
  }
  navigateToBack(){
    this.router.navigate([MembershipConfigConstants.IRRIGATION_TYPES]);
  }
}
