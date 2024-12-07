import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanConfigConstants } from '../../loan-config-constants';
import { Responsemodel } from 'src/app/shared/responsemodel';
import { CommonComponent } from 'src/app/shared/common.component';
import { EncryptDecryptService } from 'src/app/shared/encrypt-decrypt.service';
import { CropTypesService } from '../shared/crop-types.service';
import { applicationConstants } from 'src/app/shared/applicationConstants';
import { CropTypes } from '../shared/crop-types.model';

@Component({
  selector: 'app-add-crop-types',
  templateUrl: './add-crop-types.component.html',
  styleUrls: ['./add-crop-types.component.css']
})
export class AddCropTypesComponent implements OnInit{
  cities: any[] | undefined;
  statusList: any[] = [];
  isEdit: boolean = false;
  responseModel!: Responsemodel;
  msgs: any[]= [];
  loancroptypeform: FormGroup;
  buttonDisabled: any;
  cropTypesModel: CropTypes = new CropTypes();
  constructor(private router: Router, private formBuilder: FormBuilder,private commonComponent : CommonComponent  ,
    private activateRoute: ActivatedRoute, private encryptDecryptService: EncryptDecryptService,private cropTypeService : CropTypesService)
  { 
    this.loancroptypeform = this.formBuilder.group({
      'name': new FormControl('', [Validators.pattern(applicationConstants.NEW_NAME_VALIDATIONS),Validators.required]),
      'description': new FormControl(''), 
      'statusName': new FormControl('',[Validators.required]),
    });
  }
  ngOnInit() {
    this.statusList = this.commonComponent.status();
    this.activateRoute.queryParams.subscribe(params => {
      if (params['id'] != undefined) {
        let id = this.encryptDecryptService.decrypt(params['id']);
        this.cropTypeService.getCropTypesById(id).subscribe(res => {
          this.isEdit = true;
          this.responseModel = res;
          if (this.responseModel.status == applicationConstants.STATUS_SUCCESS) {
            this.cropTypesModel = this.responseModel.data[0];
          }
          else{
            this.msgs = [];
            this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
            setTimeout(() => {
              this.msgs = [];
              this.navigateToBack();
            }, 2000);
          }
        });
      } else {
        this.cropTypesModel.status = this.statusList[0].value;
      }
    }),
      (error: any) => {
      this.msgs = [];
      this.msgs =[{ severity: 'error',summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
      setTimeout(() => {
        this.msgs = [];
      }, 2000);
    }
  }
  
  navigateToBack(){
    this.router.navigate([LoanConfigConstants.CROP_TYPES]);
  }
  addOrUpdate() {
    this.commonComponent.startSpinner();
    if (this.isEdit) {
      this.cropTypeService.updateCropTypes(this.cropTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.buttonDisabled = applicationConstants.FALSE;
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.buttonDisabled = applicationConstants.FALSE;
        this.commonComponent.stopSpinner();
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
      });
    } else {
      this.cropTypeService.addCropTypes(this.cropTypesModel).subscribe((response: any) => {
        this.responseModel = response;
        if (this.responseModel.status === applicationConstants.STATUS_SUCCESS) {
          this.commonComponent.stopSpinner();
          this.msgs = [{ severity: 'success', summary: applicationConstants.STATUS_SUCCESS, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
            this.navigateToBack();
          }, 2000);
        } else {
          this.commonComponent.stopSpinner();
          this.buttonDisabled = applicationConstants.FALSE;
          this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
          setTimeout(() => {
            this.msgs = [];
          }, 2000);
        }
      }, error => {
        this.commonComponent.stopSpinner();
        this.buttonDisabled = applicationConstants.FALSE;
        this.msgs = [{ severity: 'error', summary: applicationConstants.STATUS_ERROR, detail: this.responseModel.statusMsg }];
        setTimeout(() => {
          this.msgs = [];
        }, 2000);
        this.buttonDisabled = applicationConstants.FALSE;
      });
    }
  }
  
}
